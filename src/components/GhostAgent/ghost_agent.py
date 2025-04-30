import openai
from openai import OpenAI
from openai_agents import Agent, Tool, Assistant

client = OpenAI(api_key='your_openai_api_key')

# Define the Agent model (recommended: GPT-4o for balanced capabilities)
agent_model = 'gpt-4o'

# Initialize the assistant
assistant = Assistant(client, model=agent_model)
