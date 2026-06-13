from . import llm_client, messages_template, user_message_template

class RAGPipeline:
    """
    Retrieval-Augmented Generation pipeline.
    Retrieves relevant documents and generates answers using Groq.
    """
    
    def __init__(self, enable_rag: bool = False):
        """
        Initialize RAG pipeline.
        """

        # Initialize vector_store
        # self.vector_store = vector_store
                
        # Initialize Groq
        self.llm_client = llm_client

        # Enable or disable RAG
        self.rag_enabled = enable_rag

    # def semantic_retrieval(self, query):
    #     return vector_store.similarity_search_with_score(query, k=3)

    # def augmentation(self, retrieved_docs, query, messages):
    #     context = ""
    #     print("=== Retrieved Documents ===", flush=True)
    #     for doc, score in retrieved_docs:
    #         print(f"* {doc.page_content}\n{score}", flush=True)
    #         context += f"{doc.page_content}\n"
    #     print("---" * 20, flush=True)

    #     # Update messages with the user query
    #     messages[-1] = {"role": "user", "content": user_message_template.format(context=context, query=query)}
    #     return messages

    def generation(self, messages):
        # Get the response from the LLM
        completion = llm_client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=messages,
            temperature=0,
            top_p=1,
            reasoning_effort="low",
            stream=True,
            stop=None
        )

        # Yield response chunks in real-time without buffering
        for chunk in completion:
            res = chunk.choices[0].delta.content
            if res:
                # Print for server logs
                print(res, end='', flush=True)
                # Yield chunk immediately for streaming response
                yield res

    def initiate(self, messages):
        if self.rag_enabled:
            raise Exception("RAG isn't supported in this branch")
            # # Get last user query
            # query = messages[-1]['content']

            # # Similarity search
            # retrieved_docs = self.semantic_retrieval(query)

            # # Augmentation
            # messages_augmented = self.augmentation(retrieved_docs, query, messages)

            # # Generation
            # yield from self.generation(messages_template + messages_augmented)
        else:
            yield from self.generation(messages_template + messages)

def initialize_rag_pipeline(enable_rag: bool):
    return RAGPipeline(enable_rag=enable_rag)
