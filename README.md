# Awesome Agent Evolution [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> AI Agent self-evolution, memory systems, autonomous self-improvement, and the infrastructure that powers them.

## Contents

- [Taxonomy](#taxonomy)
- [Agent Evolution and Self-Improvement](#agent-evolution-and-self-improvement)
- [Memory Systems](#memory-systems)
- [Agent-to-Agent Protocols](#agent-to-agent-protocols)
- [Agent Development Platforms](#agent-development-platforms)
- [Agent Coding and Software Engineering](#agent-coding-and-software-engineering)
- [Multi-Agent Frameworks](#multi-agent-frameworks)
- [Prompt and Behaviour Optimization](#prompt-and-behaviour-optimization)
- [Agent Safety and Guardrails](#agent-safety-and-guardrails)
- [Embodied AI](#embodied-ai)
- [Key Research Papers](#key-research-papers)
- [Benchmarks and Evaluation](#benchmarks-and-evaluation)
- [Community and Knowledge](#community-and-knowledge)

## Taxonomy

```mermaid
graph LR
    Root["Agent Evolution"] --> SingleAgent["Single-Agent<br/>Optimization"]
    Root --> Infrastructure["Infrastructure<br/>& Protocols"]

    SingleAgent --> Evolution["Self-Evolution<br/>& Self-Improvement"]
    SingleAgent --> Memory["Memory<br/>Systems"]
    SingleAgent --> PromptOpt["Prompt & Behaviour<br/>Optimization"]

    Infrastructure --> Protocols["A2A & MCP<br/>Protocols"]
    Infrastructure --> Platforms["Agent Development<br/>Platforms"]
    Infrastructure --> Coding["Agent Coding &<br/>Software Engineering"]
    Infrastructure --> Safety["Agent Safety<br/>& Guardrails"]
    Infrastructure --> Embodied["Embodied AI<br/>& Device Control"]
```

## Agent Evolution and Self-Improvement

Projects focused on enabling AI agents to evolve, learn, and improve autonomously.

<!-- AUTOGEN:evolution -->
- [**Eliza**](https://github.com/elizaOS/eliza#readme) - Autonomous agents for everyone. A framework for creating and deploying AI agents that evolve over time. by [@elizaOS](https://github.com/elizaOS) (19,226 stars)
- [**Agent Zero**](https://github.com/agent0ai/agent-zero#readme) - General-purpose AI agent framework that learns and evolves through interaction. by [@agent0ai](https://github.com/agent0ai) (19,057 stars)
- [**SuperAGI**](https://github.com/TransformerOptimus/SuperAGI#readme) - A dev-first open source autonomous AI agent framework. Build, manage and run self-improving autonomous agents. by [@TransformerOptimus](https://github.com/TransformerOptimus) (17,668 stars)
- [**evolver**](https://github.com/EvoMap/evolver#readme) - The GEP-powered self-evolution engine for AI agents. Genome Evolution Protocol enables agents to evolve autonomously via mutation and selection. by [@EvoMap](https://github.com/EvoMap) (9,043 stars)
- [**OpenEvolve**](https://github.com/algorithmicsuperintelligence/openevolve#readme) - Open-source evolutionary coding agent inspired by AlphaEvolve. Evolves code solutions through LLM-driven mutation and selection. by [@algorithmicsuperintelligence](https://github.com/algorithmicsuperintelligence) (7,302 stars)
- [**Agents (aiwaves)**](https://github.com/aiwaves-cn/agents#readme) - An open-source framework for data-centric, self-evolving autonomous language agents. by [@aiwaves-cn](https://github.com/aiwaves-cn) (5,961 stars)
- [**EvoAgentX**](https://github.com/ANative-Lab/EvoAgentX#readme) - Automated framework for evolving agentic workflows. Optimizes agent prompts, tools, and pipelines via evolutionary algorithms. by [@ANative-Lab](https://github.com/ANative-Lab) (3,287 stars)
- [**HyperAgents**](https://github.com/facebookresearch/HyperAgents#readme) - Self-referential self-improving agents by Meta. DGM-Hyperagents add an optimization layer so agents edit their own improvement process. by [@facebookresearch](https://github.com/facebookresearch) (2,701 stars)
- [**SIA**](https://github.com/hexo-ai/sia#readme) - Self-improving AI framework that autonomously optimizes the performance of any AI system through iterative evaluation and refinement. by [@hexo-ai](https://github.com/hexo-ai) (2,136 stars)
- [**Orkas**](https://github.com/Orkas-AI/Orkas#readme) - Local-first multi-agent desktop application whose specialist agents improve through reflection and crystallize successful approaches into private reusable skills. by [@Orkas-AI](https://github.com/Orkas-AI) (1,626 stars)
- [**Agent0**](https://github.com/aiming-lab/Agent0#readme) - Self-evolving agent framework from UNC/Salesforce/Stanford. Improves without human-curated datasets via curriculum and executor agent competition. by [@aiming-lab](https://github.com/aiming-lab) (1,257 stars)
- [**Ouroboros**](https://github.com/razzant/ouroboros#readme) - Self-creating AI agent that writes its own code and evolves autonomously. Completed 30+ evolution cycles in first 24 hours with zero human intervention. by [@razzant](https://github.com/razzant) (1,254 stars)
- [**agent-qa**](https://github.com/vostride/agent-qa#readme) - Self-improving QA agent for natural-language web and mobile tests, using persistent run memory to adapt to UI changes and catch regressions. Source-available under FSL-1.1-ALv2: use is permitted except to provide a competing commercial product or service, and each release converts to Apache-2.0 after two years. by [@vostride](https://github.com/vostride) (897 stars)
- [**A-Evolve**](https://github.com/A-EVO-Lab/a-evolve#readme) - The PyTorch for Agentic AI. Open-source infrastructure that evolves any agent across any domain with zero human intervention. #1 on MCP-Atlas (79.4%). by [@A-EVO-Lab](https://github.com/A-EVO-Lab) (771 stars)
- [**OpenProgram**](https://github.com/Fzkuji/OpenProgram#readme) - Self-programming AI agent framework whose agents create, run, and refine their own workflows while the runtime manages models, tools, memory, context, and multi-agent collaboration. by [@Fzkuji](https://github.com/Fzkuji) (350 stars)
- [**Reef**](https://github.com/Human-Agent-Society/reef#readme) - Continual learning infra for self-improving agents. Serves agent traffic, turns matched feedback into model-weight or harness updates, and publishes accepted updates as versioned artifacts. by [@Human-Agent-Society](https://github.com/Human-Agent-Society) (343 stars)
- [**SEAgent**](https://github.com/SunzeY/SEAgent#readme) - Self-Evolving Computer Use Agent with Autonomous Learning from Experience. by [@SunzeY](https://github.com/SunzeY) (263 stars)
<!-- /AUTOGEN:evolution -->

## Memory Systems

Vector, graph, episodic, and hybrid memory architectures for persistent agent cognition.

<!-- AUTOGEN:memory -->
- [**Mem0**](https://github.com/mem0ai/mem0#readme) - Production-ready AI agent memory with scalable long-term memory. 26% improvement over baseline on LOCOMO benchmark with 91% latency reduction. by [@mem0ai](https://github.com/mem0ai) (64,565 stars)
- [**Cognee**](https://github.com/topoteretes/cognee#readme) - Knowledge engine for AI agent memory. Build and query knowledge graphs from unstructured data in 6 lines of code. by [@topoteretes](https://github.com/topoteretes) (30,411 stars)
- [**agentmemory**](https://github.com/rohitg00/agentmemory#readme) - Persistent, benchmark-tuned memory for coding agents (Claude Code, Cursor, Copilot CLI, Codex, and any MCP client). Remembers context across sessions so you stop re-explaining. by [@rohitg00](https://github.com/rohitg00) (27,926 stars)
- [**TencentDB Agent Memory**](https://github.com/TencentCloud/TencentDB-Agent-Memory#readme) - Fully local long-term memory for AI agents via a four-tier progressive storage architecture, from Tencent Cloud. by [@TencentCloud](https://github.com/TencentCloud) (25,659 stars)
- [**Letta**](https://github.com/letta-ai/letta#readme) - Platform for building stateful agents with advanced self-editing memory. Formerly MemGPT. by [@letta-ai](https://github.com/letta-ai) (24,563 stars)
- [**Memvid**](https://github.com/memvid/memvid#readme) - Single-file memory layer for AI Agents in Rust. +35% SOTA on LoCoMo with ultra-low latency (0.025ms P50). by [@memvid](https://github.com/memvid) (16,460 stars)
- [**memU**](https://github.com/NevaMind-AI/memU#readme) - Memory system for 24/7 proactive agents. Persistent memory across sessions and platforms. by [@NevaMind-AI](https://github.com/NevaMind-AI) (14,371 stars)
- [**EverMemOS**](https://github.com/EverMind-AI/EverOS#readme) - Long-term memory for 24/7 AI agents across LLMs and platforms. by [@EverMind-AI](https://github.com/EverMind-AI) (12,641 stars)
- [**holaOS**](https://github.com/holaboss-ai/holaOS#readme) - Agent environment for long-horizon work, continuity, and self-evolution. by [@holaboss-ai](https://github.com/holaboss-ai) (11,117 stars)
- [**ChatLab**](https://github.com/ChatLab/ChatLab#readme) - Rediscover your social memories with local, AI-powered analysis. 本地化的聊天记录分析工具，通过 AI Agent 回顾你的社交记忆。. by [@ChatLab](https://github.com/ChatLab) (7,291 stars)
- [**honcho**](https://github.com/plastic-labs/honcho#readme) - Memory library for building stateful agents with user context management. by [@plastic-labs](https://github.com/plastic-labs) (6,982 stars)
- [**memgraph**](https://github.com/memgraph/memgraph#readme) - High-performance open-source in-memory graph database for GraphRAG, AI memory, agentic AI, and real-time graph analytics. Cypher-compatible, built in C++. by [@memgraph](https://github.com/memgraph) (4,379 stars)
- [**Acontext**](https://github.com/memodb-io/Acontext#readme) - Open-source skill memory layer for AI agents. Automatically captures learnings from agent runs and stores them as reusable skill files. by [@memodb-io](https://github.com/memodb-io) (3,679 stars)
- [**ReMe**](https://github.com/agentscope-ai/ReMe#readme) - Memory management kit for agents. File-based and vector-based memory systems. SOTA on LoCoMo and HaluMem benchmarks. by [@agentscope-ai](https://github.com/agentscope-ai) (3,384 stars)
- [**MemMachine**](https://github.com/MemMachine/MemMachine#readme) - Universal memory layer for AI agents. Episodic (graph-based), profile (SQL), and working memory with scalable storage and retrieval. by [@MemMachine](https://github.com/MemMachine) (3,210 stars)
- [**datachain**](https://github.com/datachain-ai/datachain#readme) - Operational data context layer for AI agents providing typed and versioned datasets over multimodal content. by [@datachain-ai](https://github.com/datachain-ai) (2,815 stars)
- [**nocturne_memory**](https://github.com/Dataojitori/nocturne_memory#readme) - Lightweight, rollbackable Long-Term Memory Server for MCP Agents with graph-like structured memory. by [@Dataojitori](https://github.com/Dataojitori) (1,339 stars)
- [**Mem9**](https://github.com/mem9-ai/mem9#readme) - Unlimited persistent memory layer for AI agents. Cloud-synced memory across sessions and tools. by [@mem9-ai](https://github.com/mem9-ai) (1,203 stars)
- [**Awesome-AI-Memory**](https://github.com/IAAR-Shanghai/Awesome-AI-Memory#readme) - Curated knowledge base on AI memory for LLMs and agents, covering long-term memory, reasoning, retrieval, and system design. by [@IAAR-Shanghai](https://github.com/IAAR-Shanghai) (1,195 stars)
- [**Awesome-Agent-Memory**](https://github.com/TeleAI-UAGI/Awesome-Agent-Memory#readme) - Curated systems, benchmarks, and papers on memory for LLMs/MLLMs -- long-term context, retrieval, and reasoning. by [@TeleAI-UAGI](https://github.com/TeleAI-UAGI) (619 stars)
- [**MemSkill**](https://github.com/ViktorAxelsen/MemSkill#readme) - Learning and evolving memory skills for self-evolving agents. Meta-memory that determines what to extract, remember, and forget. by [@ViktorAxelsen](https://github.com/ViktorAxelsen) (569 stars)
- [**TeleMem**](https://github.com/TeleAI-UAGI/telemem#readme) - High-performance drop-in Mem0 replacement. 19% higher accuracy, 43% fewer tokens, and 2.1x speedup via narrative dynamic extraction. by [@TeleAI-UAGI](https://github.com/TeleAI-UAGI) (486 stars)
<!-- /AUTOGEN:memory -->

## Agent-to-Agent Protocols

Standards and protocols for inter-agent communication and interoperability.

<!-- AUTOGEN:protocols -->
- [**Google A2A**](https://github.com/a2aproject/A2A#readme) - Google's open Agent-to-Agent protocol. Enables agent discovery, secure collaboration, and long-running tasks while preserving agent opacity. by [@a2aproject](https://github.com/a2aproject) (25,600 stars)
- [**mcp-use**](https://github.com/mcp-use/mcp-use#readme) - The fullstack MCP framework to develop MCP Apps for ChatGPT/Claude and MCP Servers for AI Agents. by [@mcp-use](https://github.com/mcp-use) (10,553 stars)
- [**openagent**](https://github.com/the-open-agent/openagent#readme) - Enterprise AI platform with MCP and A2A protocol management, knowledge base, and admin interface. by [@the-open-agent](https://github.com/the-open-agent) (5,598 stars)
- [**ViteMCP**](https://github.com/punkpeye/fastmcp#readme) - A TypeScript framework for building MCP servers. by [@punkpeye](https://github.com/punkpeye) (3,259 stars)
- [**arcade-mcp**](https://github.com/ArcadeAI/arcade-mcp#readme) - MCP server framework and tool-development library for building custom agent capabilities and authenticated tool calls. by [@ArcadeAI](https://github.com/ArcadeAI) (1,015 stars)
- [**A2A x402**](https://github.com/google-agentic-commerce/a2a-x402#readme) - A2A protocol extension adding x402 on-chain payments, letting agents monetize services over Agent-to-Agent calls. by [@google-agentic-commerce](https://github.com/google-agentic-commerce) (558 stars)
- [**GEP MCP Server**](https://github.com/EvoMap/gep-mcp-server#readme) - MCP Server for Genome Evolution Protocol. Exposes evolution tools to Claude Desktop, Cursor, and any MCP client. by [@EvoMap](https://github.com/EvoMap) (6 stars)
<!-- /AUTOGEN:protocols -->

## Agent Development Platforms

Platforms and tools for building, deploying, and managing AI agents.

<!-- AUTOGEN:platforms -->
- [**dify**](https://github.com/langgenius/dify#readme) - Production-ready platform for building agentic AI workflows with visual orchestration. by [@langgenius](https://github.com/langgenius) (154,200 stars)
- [**LangChain**](https://github.com/langchain-ai/langchain#readme) - Full-stack agent engineering platform with composable chains, tools, and memory integration. by [@langchain-ai](https://github.com/langchain-ai) (145,492 stars)
- [**OpenHands**](https://github.com/OpenHands/OpenHands#readme) - Open platform for AI software developers as generalist agents. Autonomous coding, debugging, and deployment. by [@OpenHands](https://github.com/OpenHands) (85,934 stars)
- [**CowAgent**](https://github.com/zhayujie/CowAgent#readme) - Super AI assistant based on LLMs with autonomous thinking, task planning, skill creation, and long-term memory. by [@zhayujie](https://github.com/zhayujie) (46,759 stars)
- [**agno**](https://github.com/agno-agi/agno#readme) - Production-ready agent framework that turns agents into deployable services with multi-framework support. by [@agno-agi](https://github.com/agno-agi) (42,008 stars)
- [**langgraph**](https://github.com/langchain-ai/langgraph#readme) - Build resilient language agents as stateful graphs with persistence and streaming. by [@langchain-ai](https://github.com/langchain-ai) (40,909 stars)
- [**CoPaw**](https://github.com/agentscope-ai/QwenPaw#readme) - Co Personal Agent Workstation built on AgentScope. Desktop agent platform with multi-agent collaboration and tool integration. by [@agentscope-ai](https://github.com/agentscope-ai) (34,784 stars)
- [**mastra**](https://github.com/mastra-ai/mastra#readme) - TypeScript framework for building AI-powered applications with agent workflows and RAG. by [@mastra-ai](https://github.com/mastra-ai) (27,635 stars)
- [**AgenticSeek**](https://github.com/Fosowl/agenticSeek#readme) - Fully local autonomous agent with browsing, coding, and multi-agent capabilities. No API keys required. by [@Fosowl](https://github.com/Fosowl) (27,109 stars)
- [**haystack**](https://github.com/deepset-ai/haystack#readme) - Open-source AI orchestration framework for building context-engineered production applications. by [@deepset-ai](https://github.com/deepset-ai) (26,395 stars)
- [**Coze Studio**](https://github.com/coze-dev/coze-studio#readme) - AI agent development platform with visual tools for creating, debugging, and deploying agents. by [@coze-dev](https://github.com/coze-dev) (21,532 stars)
- [**Google ADK**](https://github.com/google/adk-python#readme) - Open-source Python toolkit by Google for building, evaluating, and deploying sophisticated AI agents. by [@google](https://github.com/google) (21,372 stars)
- [**PydanticAI**](https://github.com/pydantic/pydantic-ai#readme) - Type-safe AI agent framework built on Pydantic with structured outputs and dependency injection. by [@pydantic](https://github.com/pydantic) (19,664 stars)
- [**Parlant**](https://github.com/emcie-co/parlant#readme) - The conversational control layer for customer-facing AI agents. A context-engineering framework for controlling interactions. by [@emcie-co](https://github.com/emcie-co) (18,273 stars)
- [**OpenFang**](https://github.com/RightNow-AI/openfang#readme) - Open-source Agent Operating System for deploying and managing AI agents. by [@RightNow-AI](https://github.com/RightNow-AI) (18,159 stars)
- [**agents**](https://github.com/livekit/agents#readme) - Framework for building realtime voice AI agents with speech-to-speech pipelines. by [@livekit](https://github.com/livekit) (13,955 stars)
- [**ten-framework**](https://github.com/TEN-framework/ten-framework#readme) - Open-source framework for building conversational voice AI agents. by [@TEN-framework](https://github.com/TEN-framework) (11,101 stars)
- [**Agent-Squad**](https://github.com/2FastLabs/agent-squad#readme) - Flexible framework for managing multiple AI agents and handling complex conversations. by [@2FastLabs](https://github.com/2FastLabs) (7,752 stars)
- [**PySpur**](https://github.com/PySpur-Dev/pyspur#readme) - Visual playground for agentic workflows with rapid iteration on multi-agent pipelines. by [@PySpur-Dev](https://github.com/PySpur-Dev) (5,779 stars)
- [**MS-Agent**](https://github.com/modelscope/ms-agent#readme) - Lightweight framework by ModelScope to empower agentic execution of complex tasks with memory and deep research. by [@modelscope](https://github.com/modelscope) (4,374 stars)
<!-- /AUTOGEN:platforms -->

## Agent Coding and Software Engineering

AI agents that write, debug, and maintain code autonomously.

<!-- AUTOGEN:coding -->
- [**Claude Code**](https://github.com/anthropics/claude-code#readme) - Terminal-native agentic coding tool from Anthropic. Understands your codebase and executes tasks through natural language. by [@anthropics](https://github.com/anthropics) (143,752 stars)
- [**Codex**](https://github.com/openai/codex#readme) - Lightweight coding agent from OpenAI written in Rust. Runs locally as CLI, IDE extension, or desktop app. by [@OpenAI](https://github.com/OpenAI) (120,873 stars)
- [**Pi**](https://github.com/earendil-works/pi#readme) - Self-extensible coding agent and agent harness. Bundles an interactive coding CLI, an agent runtime with tool calling and state, and a unified multi-provider LLM API. by [@earendil-works](https://github.com/earendil-works) (100,802 stars)
- [**agent-skills**](https://github.com/addyosmani/agent-skills#readme) - Production-grade engineering skills and best practices for AI coding agents. by [@addyosmani](https://github.com/addyosmani) (91,577 stars)
- [**Taste-Skill**](https://github.com/Leonxlnx/taste-skill#readme) - High-Agency frontend skill that helps AI generate less generic, more tasteful outputs. by [@Leonxlnx](https://github.com/Leonxlnx) (83,504 stars)
- [**Cline**](https://github.com/cline/cline#readme) - Autonomous coding agent available as an IDE extension, CLI, or SDK. Plans and executes multi-step edits with human-in-the-loop approval. by [@cline](https://github.com/cline) (67,328 stars)
- [**goose**](https://github.com/aaif-goose/goose#readme) - Open-source extensible AI coding agent that goes beyond code suggestions. by [@aaif-goose](https://github.com/aaif-goose) (53,828 stars)
- [**Aider**](https://github.com/Aider-AI/aider#readme) - AI pair programming in your terminal. Edit code with LLMs across 100+ languages with deep Git integration. by [@Aider-AI](https://github.com/Aider-AI) (48,666 stars)
- [**Qwen Code**](https://github.com/QwenLM/qwen-code#readme) - Open-source AI coding agent that lives in your terminal, optimized for Qwen-Coder models. by [@QwenLM](https://github.com/QwenLM) (27,575 stars)
- [**context-mode**](https://github.com/mksglu/context-mode#readme) - Context window optimization tool for AI coding agents with sandboxed tool output and 98% token reduction. by [@mksglu](https://github.com/mksglu) (20,309 stars)
- [**SWE-Agent**](https://github.com/SWE-agent/SWE-agent#readme) - Automatically fix GitHub issues and handle cybersecurity challenges. State-of-the-art on SWE-bench. by [@SWE-agent](https://github.com/SWE-agent) (20,192 stars)
- [**Devika**](https://github.com/stitionai/devika#readme) - The first open-source implementation of an Agentic Software Engineer. An open-source alternative to Devin. by [@stitionai](https://github.com/stitionai) (19,557 stars)
- [**Plandex**](https://github.com/plandex-ai/plandex#readme) - Open-source AI coding agent designed for large projects and complex real-world tasks with persistent context. by [@plandex-ai](https://github.com/plandex-ai) (15,614 stars)
- [**Trae Agent**](https://github.com/bytedance/trae-agent#readme) - LLM-based agent by ByteDance for general-purpose software engineering tasks. by [@bytedance](https://github.com/bytedance) (12,065 stars)
- [**Open SWE**](https://github.com/langchain-ai/open-swe#readme) - Open-source asynchronous coding agent by LangChain for software engineering tasks. by [@langchain-ai](https://github.com/langchain-ai) (10,649 stars)
- [**Mini-SWE-Agent**](https://github.com/SWE-agent/mini-swe-agent#readme) - The 100-line AI agent that solves GitHub issues. Radically simple but scores >74% on SWE-bench verified. by [@SWE-agent](https://github.com/SWE-agent) (6,911 stars)
- [**Reflexion**](https://github.com/noahshinn/reflexion#readme) - Language agents with verbal reinforcement learning. Agents that learn from mistakes through self-reflection. by [@noahshinn](https://github.com/noahshinn) (3,251 stars)
- [**Autohand Code**](https://github.com/autohandai/code-cli#readme) - Self-evolving coding agent that runs in your terminal. by [@autohandai](https://github.com/autohandai) (181 stars)
<!-- /AUTOGEN:coding -->

## Multi-Agent Frameworks

Multi-agent frameworks and collaborative agent systems that are relevant to agent evolution and infrastructure.

<!-- AUTOGEN:multi-agent -->
- [**MetaGPT**](https://github.com/FoundationAgents/MetaGPT#readme) - Multi-agent framework that assigns roles to GPTs to form a collaborative software entity. by [@FoundationAgents](https://github.com/FoundationAgents) (70,169 stars)
- [**autogen**](https://github.com/microsoft/autogen#readme) - Programming framework for building agentic AI systems with multi-agent conversations. by [@microsoft](https://github.com/microsoft) (60,754 stars)
- [**crewAI**](https://github.com/crewAIInc/crewAI#readme) - Framework for orchestrating role-playing autonomous AI agents for collaborative task execution. by [@crewAIInc](https://github.com/crewAIInc) (57,987 stars)
- [**Vibe-Trading**](https://github.com/HKUDS/Vibe-Trading#readme) - Personal trading agent for multi-agent market analysis and backtesting. by [@HKUDS](https://github.com/HKUDS) (32,290 stars)
- [**agentscope**](https://github.com/agentscope-ai/agentscope#readme) - Multi-agent platform for building agents you can see, understand and trust. by [@agentscope-ai](https://github.com/agentscope-ai) (30,403 stars)
- [**openai-agents-python**](https://github.com/openai/openai-agents-python#readme) - Lightweight framework for multi-agent workflows by OpenAI. by [@openai](https://github.com/openai) (29,134 stars)
- [**GenAI Agents**](https://github.com/NirDiamant/GenAI_Agents#readme) - Comprehensive tutorials and implementations covering 50+ generative AI agent techniques from basic to advanced. by [@NirDiamant](https://github.com/NirDiamant) (24,101 stars)
- [**swarm**](https://github.com/openai/swarm#readme) - Educational framework exploring ergonomic lightweight multi-agent orchestration by OpenAI. by [@openai](https://github.com/openai) (21,934 stars)
- [**camel**](https://github.com/camel-ai/camel#readme) - Multi-agent framework for finding the scaling law of agents through role-playing communication. by [@camel-ai](https://github.com/camel-ai) (17,660 stars)
- [**agent-framework**](https://github.com/microsoft/agent-framework#readme) - Framework for building, orchestrating and deploying AI agents and multi-agent systems. by [@microsoft](https://github.com/microsoft) (13,290 stars)
- [**PraisonAI**](https://github.com/MervinPraison/PraisonAI#readme) - AI employee team platform that automates and solves complex challenges with multi-agent collaboration. by [@MervinPraison](https://github.com/MervinPraison) (9,001 stars)
- [**swarms**](https://github.com/kyegomez/swarms#readme) - Enterprise-grade production-ready multi-agent orchestration framework. by [@kyegomez](https://github.com/kyegomez) (7,116 stars)
- [**MindSearch**](https://github.com/InternLM/MindSearch#readme) - LLM-based multi-agent framework for web search engines with deep information seeking. by [@InternLM](https://github.com/InternLM) (6,918 stars)
- [**open-multi-agent**](https://github.com/open-multi-agent/open-multi-agent#readme) - TypeScript multi-agent framework with one function call from goal to result. by [@open-multi-agent](https://github.com/open-multi-agent) (6,860 stars)
- [**agency-swarm**](https://github.com/VRSEN/agency-swarm#readme) - Reliable multi-agent orchestration framework for building AI agent swarms. by [@VRSEN](https://github.com/VRSEN) (4,546 stars)
- [**Golutra**](https://github.com/golutra/golutra#readme) - Multi-agent AI orchestration platform for automation, workflows, and developer tools. by [@golutra](https://github.com/golutra) (3,828 stars)
- [**GoClaw**](https://github.com/nextlevelbuilder/goclaw#readme) - OpenClaw rebuilt in Go with multi-tenant isolation, 5-layer security, and native concurrency for deploying AI agent teams at scale. by [@nextlevelbuilder](https://github.com/nextlevelbuilder) (3,582 stars)
- [**BotSharp**](https://github.com/SciSharp/BotSharp#readme) - AI multi-agent framework built on .NET for enterprise conversational applications. by [@SciSharp](https://github.com/SciSharp) (3,099 stars)
- [**agentUniverse**](https://github.com/agentuniverse-ai/agentUniverse#readme) - LLM multi-agent framework for building, customizing and running collaborative agents. by [@agentuniverse-ai](https://github.com/agentuniverse-ai) (2,347 stars)
- [**LLMStack**](https://github.com/trypromptly/LLMStack#readme) - No-code multi-agent framework for building LLM agent workflows and applications. by [@trypromptly](https://github.com/trypromptly) (2,311 stars)
- [**Sage**](https://github.com/ZHangZHengEric/Sage#readme) - Multi-agent system framework for complex tasks. by [@ZHangZHengEric](https://github.com/ZHangZHengEric) (1,213 stars)
<!-- /AUTOGEN:multi-agent -->


Tools and frameworks for automatically optimizing agent prompts, instructions, and behavioral patterns.

<!-- AUTOGEN:prompt-optimization -->
- [**Promptfoo**](https://github.com/promptfoo/promptfoo#readme) - Open-source LLM evaluation and red-teaming framework. Test prompts, agents, and RAGs with 90+ model providers and 67+ security plugins. by [@promptfoo](https://github.com/promptfoo) (24,747 stars)
- [**TextGrad**](https://github.com/zou-group/textgrad#readme) - Automatic differentiation via text. Backpropagation through LLM-provided textual gradients, published in Nature. by [@zou-group](https://github.com/zou-group) (3,713 stars)
<!-- /AUTOGEN:prompt-optimization -->

## Agent Safety and Guardrails

Projects focused on controlling agent actions, enforcing policies, and preventing harmful behavior.

<!-- AUTOGEN:safety -->
- [**NeMo Guardrails**](https://github.com/NVIDIA-NeMo/Guardrails#readme) - NVIDIA's toolkit for adding programmable guardrails to LLM conversational systems. Policy-based safety controls. by [@NVIDIA-NeMo](https://github.com/NVIDIA-NeMo) (7,047 stars)
- [**AgentDoG**](https://github.com/AI45Lab/AgentDoG#readme) - Diagnostic guardrail framework for AI agent safety and security. Detects and intercepts unsafe agent behavior at runtime. by [@AI45Lab](https://github.com/AI45Lab) (692 stars)
<!-- /AUTOGEN:safety -->

## Embodied AI

Projects connecting AI agents to physical devices, robotics, and real-world environments.

<!-- AUTOGEN:embodied -->
- [**LeRobot**](https://github.com/huggingface/lerobot#readme) - Open-source robotics framework by Hugging Face. Models, datasets, and tools for real-world robotics in PyTorch. by [@huggingface](https://github.com/huggingface) (27,155 stars)
- [**Open-AutoGLM**](https://github.com/zai-org/Open-AutoGLM#readme) - An Open Phone Agent Model and Framework. Unlocking the AI Phone for Everyone. by [@zai-org](https://github.com/zai-org) (26,141 stars)
- [**Nanobrowser**](https://github.com/nanobrowser/nanobrowser#readme) - Chrome extension for AI-powered web automation. Run multi-agent workflows using your own AI keys. by [@nanobrowser](https://github.com/nanobrowser) (13,716 stars)
- [**XcodeBuildMCP**](https://github.com/getsentry/XcodeBuildMCP#readme) - A MCP server and CLI for agent use when working on iOS and macOS projects. by [@getsentry](https://github.com/getsentry) (6,326 stars)
- [**Mobile MCP**](https://github.com/mobile-next/mobile-mcp#readme) - Model Context Protocol Server for Mobile Automation and Scraping (iOS, Android, Emulators and Real Devices). by [@mobile-next](https://github.com/mobile-next) (6,310 stars)
- [**agent-device**](https://github.com/callstack/agent-device#readme) - CLI that lets AI agents drive real iOS and Android devices — taps, text input, screenshots, and app control for mobile automation. by [@callstack](https://github.com/callstack) (4,321 stars)
- [**ROS-LLM**](https://github.com/Auromix/ROS-LLM#readme) - Framework for embodied intelligence in ROS. Natural language interactions with LLMs for robot control. by [@Auromix](https://github.com/Auromix) (827 stars)
- [**RAI**](https://github.com/RobotecAI/rai#readme) - Vendor-agnostic agentic framework for Physical AI and robotics. Connects LLM agents to ROS 2 tools for perception, reasoning, and control. by [@RobotecAI](https://github.com/RobotecAI) (576 stars)
<!-- /AUTOGEN:embodied -->

## Key Research Papers

### Surveys

- [A Comprehensive Survey of Self-Evolving AI Agents](https://arxiv.org/abs/2508.07407) (arXiv'25) - Unified framework with four components: System Inputs, Agent System, Environment, and Optimisers. Covers evolution of models, prompts, memory, tools, and workflows.
- [A Survey of Self-Evolving Agents: What, When, How, and Where to Evolve](https://arxiv.org/abs/2507.21046) (TMLR'26) - Organizes around what to evolve, when to evolve, and how to evolve. Covers intra-test-time and inter-test-time adaptation.
- [Memory for Autonomous LLM Agents: Mechanisms, Evaluation, and Emerging Frontiers](https://arxiv.org/abs/2603.07670) (arXiv'26) - Formalizes agent memory as write-manage-read loop. Taxonomy spanning temporal scope, representational substrate, and control policy.

### Self-Evolution and Lifelong Learning

- [Live-SWE-agent: Can Software Engineering Agents Self-Evolve on the Fly?](https://arxiv.org/abs/2511.13646) (arXiv'25) - First live agent that autonomously evolves itself during runtime. 77.4% on SWE-bench Verified.
- [EvoClaw: Evaluating AI Agents on Continuous Software Evolution](https://arxiv.org/abs/2603.13428) (arXiv'26) - Benchmark revealing performance drops from >80% to at most 38% in continuous evolution settings.
- [Symbolic Learning Enables Self-Evolving Agents](https://arxiv.org/abs/2406.18532) (arXiv'24) - Agents that evolve through symbolic representation learning.
- [Building Self-Evolving Agents via Experience-Driven Lifelong Learning](https://arxiv.org/abs/2504.01072) (arXiv'25) - Framework and benchmark for lifelong agent learning.
- [Darwin Godel Machine](https://arxiv.org/abs/2505.22954) (arXiv'25) - Agents that rewrite their own code through evolutionary pressure.
- [EvoAgent: Self-evolving Agent with Continual World Model](https://arxiv.org/abs/2502.05907) (arXiv'25) - Continual world model for long-horizon task evolution.
- [Absolute Zero: Reinforced Self-play Reasoning with Zero Data](https://arxiv.org/abs/2505.03335) (arXiv'25) - Self-play reasoning without any training data.
- [AutoAgent: Evolving Cognition and Elastic Memory Orchestration](https://arxiv.org/abs/2603.09716) (arXiv'26) - Self-evolving framework with evolving cognition and elastic memory.
- [Group-Evolving Agents](https://arxiv.org/abs/2602.04837) (arXiv'26) - Agent groups as evolutionary units with experience sharing. 71.0% on SWE-bench Verified.
- [Agent0: Unleashing Self-Evolving Agents from Zero Data](https://arxiv.org/abs/2511.16043) (arXiv'25) - Curriculum and executor competition for self-improvement.
- [SEMAG: Self-Evolutionary Multi-Agent Code Generation](https://arxiv.org/abs/2603.15707) (arXiv'26) - Self-evolutionary agents that auto-upgrade backbone models. 52.6% on CodeContests.
- [SAGE: Multi-Agent Self-Evolution for LLM Reasoning](https://arxiv.org/abs/2603.15255) (arXiv'26) - Four co-evolving agents from shared LLM backbone.

### Memory Optimization

- [Agentic Memory: Unified Long-Term and Short-Term Memory Management](https://arxiv.org/abs/2601.01885) (arXiv'26) - Memory operations as tool-based actions with progressive RL training via GRPO.
- [MEMORA: Harmonic Memory Representation](https://arxiv.org/abs/2602.03315) (arXiv'26) - Balances abstraction and specificity. SOTA on LoCoMo and LongMemEval.
- [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory](https://arxiv.org/abs/2504.19413) (arXiv'25) - Production architecture. 26% improvement on LOCOMO, 91% latency reduction.
- [TeleMem: Long-Term and Multimodal Memory for Agentic AI](https://arxiv.org/abs/2601.06037) - Multimodal memory achieving 19% higher accuracy, 43% fewer tokens, 2.1x speedup over Mem0. (arXiv 2026)
- [A-MEM: Agentic Memory for LLM Agents](https://arxiv.org/abs/2502.12110) (arXiv'25) - Self-organizing memory with autonomous management.
- [Agent Workflow Memory](https://arxiv.org/abs/2409.07429) (ICML'24) - Memory tied to agent workflow patterns.
- [MemoryBank: Enhancing Large Language Models with Long-Term Memory](https://arxiv.org/abs/2305.10250) (AAAI'24) - Structured long-term memory for LLMs.
- [Compress to Impress](https://arxiv.org/abs/2402.11975) (ICLR'25) - Compression-based memory for extended dialogues.

### Prompt and Behaviour Evolution

- [ARTEMIS: Evolutionary Optimization for LLM Agent Configurations](https://arxiv.org/abs/2512.09108) (arXiv'25) - Semantically-aware genetic operators for joint agent config optimization. 13.6% on competitive programming.
- [E-SPL: Unifying Evolutionary Prompt Search and Reinforcement Learning](https://arxiv.org/abs/2602.14697) (arXiv'26) - Joint RL weight updates with genetic operators for system prompt evolution.
- [EvoPrompt: Connecting LLMs with Evolutionary Algorithms](https://arxiv.org/abs/2309.08532) (ICLR'24) - Evolutionary algorithms for prompt optimization.
- [Promptbreeder: Self-Referential Self-Improvement Via Prompt Evolution](https://arxiv.org/abs/2309.16797) (ICML'24) - Prompts that evolve themselves recursively.
- [Large Language Models as Optimizers (OPRO)](https://arxiv.org/abs/2309.03409) (ICLR'24) - Using LLMs to optimize their own prompts.
- [TextGrad: Automatic Differentiation via Text](https://arxiv.org/abs/2406.07496) (Nature'25) - Gradient-like optimization through text feedback.

### Tool and Code Evolution

- [AlphaEvolve](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf) (Google'25) - LLM-driven evolutionary code improvement.
- [Learning Evolving Tools for Large Language Models](https://arxiv.org/abs/2410.06617) (ICLR'25) - Tools that co-evolve with agent capabilities.
- [CREATOR: Tool Creation for Disentangling Abstract and Concrete Reasoning](https://arxiv.org/abs/2305.14318) (EMNLP'23) - Agents that create their own tools.
- [ToolRL: Reward is All Tool Learning Needs](https://arxiv.org/abs/2504.13958) (arXiv'25) - Reinforcement learning for tool use optimization.

### Reasoning and Planning

- [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366) (NeurIPS'23) - Agents that learn from mistakes through self-reflection.
- [ReflAct: World-Grounded Decision Making via Goal-State Reflection](https://arxiv.org/abs/2505.15182) (arXiv'25) - Goal-state reflection improving strategic reliability by 27.7% over ReAct.

### Safety, Red-Teaming, and Alignment

- [AgenticRed: Optimizing Agentic Systems for Automated Red-teaming](https://arxiv.org/abs/2601.13518) (arXiv'26) - Evolutionary red-teaming workflow design. 96% attack success on Llama-2-7B.
- [Agent vs. Agent: Automated Red-Teaming for Custom Agentic Workflows](https://aclanthology.org/2025.emnlp-industry.62/) (EMNLP'25) - AgentHarm-Gen for adversarial task generation. 162% increase in attack success rate.
- [AGENTSAFE: Unified Framework for Ethical Assurance and Governance](https://arxiv.org/abs/2512.03180) (arXiv'25) - Design, runtime, and audit controls covering the agentic loop.
- [OpenGuardrails: Context-Aware AI Guardrails Platform](https://arxiv.org/abs/2510.19169) (arXiv'25) - Context-aware safety detection and model-manipulation prevention.
- [Jailbreaking LLMs' Safeguard with Universal Magic Words for Text Embedding Models](https://arxiv.org/abs/2501.18280) (arXiv'25) - Universal suffix that manipulates text-embedding similarity to bypass safety guardrails across ChatGPT, DeepSeek, and Qwen.

### Embodied AI and Robotics

- [RACAS: Controlling Diverse Robots With a Single Agentic System](https://arxiv.org/abs/2603.05621) (arXiv'26) - Single architecture controlling ground robots, robotic limbs, and underwater vehicles via natural language.
- [RoboClaw: Scalable Long-Horizon Robotic Tasks](https://arxiv.org/abs/2603.11558) (arXiv'26) - VLM-driven framework with 25% improvement on long-horizon tasks and 53.7% less human time.
- [MEM: Multi-Scale Embodied Memory for Vision Language Action Models](https://arxiv.org/abs/2603.03596) (arXiv'26) - Mixed-modal memory for tasks spanning up to fifteen minutes.

## Benchmarks and Evaluation

- [SWE-bench](https://github.com/princeton-nlp/SWE-bench) (ICLR'24) - Can agents resolve real-world GitHub issues?
- [AgentBench](https://github.com/THUDM/AgentBench) (ICLR'24) - Multi-dimensional evaluation of LLMs as agents.
- [WebArena](https://github.com/web-arena-x/webarena) (ICLR'24) - Realistic web environment for autonomous agents.
- [OSWorld](https://github.com/xlang-ai/OSWorld) (NeurIPS'24) - Open-ended tasks in real computer environments.
- [GAIA](https://huggingface.co/gaia-benchmark) (ICLR'23) - General AI assistant capabilities benchmark.
- [EvoClaw](https://github.com/FSoft-AI4Code/EvoClaw) (arXiv'26) - Evaluating agents on continuous software evolution.
- [LoCoMo](https://github.com/snap-research/locomo) (arXiv'25) - Long-context memory benchmark for agent memory systems.
- [ClawBench](https://github.com/TIGER-AI-Lab/ClawBench) ([arXiv'26](https://arxiv.org/abs/2604.08523)) - Live-web evaluation with 281 total tasks (V1: 152; V2: 129), isolated execution, and replayable five-layer traces.
- [ATM-Bench](https://github.com/JingbiaoMei/ATM-Bench) (arXiv'26) - First multimodal, multi-source benchmark for personalized referential memory QA over ~4 years of personal records (emails, images, videos).
- [PerspectiveGap](https://github.com/WhymustIhaveaname/PerspectiveGap) (arXiv'26) - The first benchmark for multi-agent orchestration prompt writing, across 110 scenarios and 10 topologies.

## Community and Knowledge

<!-- AUTOGEN:community -->
- [**Awesome-Self-Evolving-Agents**](https://github.com/ANative-Lab/Awesome-Self-Evolving-Agents#readme) - A comprehensive survey of self-evolving AI agents. Covers single-agent optimization, multi-agent optimization, and domain-specific approaches. by [@ANative-Lab](https://github.com/ANative-Lab) (2,470 stars)
<!-- /AUTOGEN:community -->

## Footnotes

Maintained by [EvoMap](https://evomap.ai). See [contributing guidelines](contributing.md) for how to submit a project or paper.

Also check out [Awesome Agent Swarm](https://github.com/EvoMap/awesome-agent-swarm) for multi-agent orchestration, swarm intelligence, and collaborative agent systems.

[![Star History Chart](https://api.star-history.com/svg?repos=EvoMap/awesome-agent-evolution,EvoMap/awesome-agent-swarm,EvoMap/evolver,EvoMap/gep-mcp-server,mem0ai/mem0,letta-ai/letta,memvid/memvid,NevaMind-AI/memU,topoteretes/cognee,elizaOS/eliza,agent0ai/agent-zero,codelion/openevolve,facebookresearch/HyperAgents,anthropics/claude-code,openai/codex,google/A2A,mcp-use/mcp-use,All-Hands-AI/OpenHands,langchain-ai/langchain&type=Date)](https://star-history.com/#EvoMap/awesome-agent-evolution&EvoMap/awesome-agent-swarm&EvoMap/evolver&mem0ai/mem0&letta-ai/letta&memvid/memvid&elizaOS/eliza&agent0ai/agent-zero&codelion/openevolve&facebookresearch/HyperAgents&anthropics/claude-code&openai/codex&google/A2A&All-Hands-AI/OpenHands&langchain-ai/langchain&Date)
