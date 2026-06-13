"""
FastAPI application for RAG chatbot API.
Exposes endpoints for chat and health checks.
"""

import os
import asyncio
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from backend.RAG import initialize_rag_pipeline

class ChatPayload(BaseModel):
    messages: list

# ============= Global State =============

rag_pipeline = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage application lifecycle.
    Initialize RAG pipeline on startup.
    """
    
    print("🚀 Starting RAG pipeline initialization...")
    
    global rag_pipeline

    try:
        # Initialize pipeline
        rag_pipeline = initialize_rag_pipeline(enable_rag=False)
        print("✅ RAG pipeline initialized successfully")
    except Exception as e:
        print(f"❌ Failed to initialize RAG pipeline: {e}")
        # Continue with error handling in endpoints
    
    yield
    
    print("🛑 Shutting down...")


# ============= FastAPI App =============

app = FastAPI(
    title="NXT LTS RAG Chatbot API",
    description="RAG-powered chatbot for NXT LTS services",
    version="1.0.0",
    lifespan=lifespan
)

# ============= CORS Middleware =============

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5500",
    "https://nxt-lts.com",
    "https://www.nxt-lts.com",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://nxt-lts-website-production.up.railway.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============= Endpoints =============

@app.post("/chat")
async def chat(request: ChatPayload):
    """
    Chat endpoint for RAG-powered responses.
    
    Args:
        request: ChatPayload a list of messages with query
        
    Returns:
        Stream of text with answer and sources
        
    Raises:
        HTTPException: If RAG pipeline not initialized or API error
    """
    print(request, flush=True)
    print("Received messages:", flush=True)
    for msg in request.messages:
        print(f"  {msg.get('role')}: {msg.get('content')}", flush=True)

    if rag_pipeline is None:
        raise HTTPException(
            status_code=503,
            detail="RAG pipeline not initialized. Vector store may not be ready."
        )
    
    async def response_generator():
        try:
            # Generate answer using RAG pipeline
            # Wrap the synchronous generator to yield chunks immediately without buffering
            for chunk in rag_pipeline.initiate(messages=request.messages):
                if chunk:
                    yield chunk
                    # Flush stdout to ensure chunks are sent without buffering
                    sys.stdout.flush()
                    # Yield control to allow chunk to be transmitted before collecting next chunk
                    await asyncio.sleep(0)
        
        except Exception as e:
            print(f"Error in chat endpoint: {e}")
            sys.stdout.flush()
            raise HTTPException(
                status_code=500,
                detail=f"Error generating response: {str(e)}"
            )
    # Use text/plain media type for direct text streaming (not SSE format)
    return StreamingResponse(response_generator(), media_type="text/plain")


@app.get("/dev")
async def serve_dev():
    """Root endpoint with API information."""
    return {
        "name": "NXT LTS RAG Chatbot API",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/chat",
            "docs": "/docs",
        }
    }

# Serve static files (CSS, JS, etc.) from a folder
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

@app.get("/")
async def root():
    return FileResponse("frontend/index.html")


@app.get("/docs", include_in_schema=False)
async def get_docs():
    """API documentation (handled by FastAPI automatically)."""
    return {"message": "Visit /docs for interactive documentation"}


# ============= Error Handlers =============

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions."""
    return {
        "error": exc.detail,
        "status_code": exc.status_code
    }


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8080))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"Starting server on {host}:{port}")
    uvicorn.run(app, host=host, port=port)
