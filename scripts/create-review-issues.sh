#!/usr/bin/env bash
set -euo pipefail

REPO="EvoMap/awesome-agent-evolution"

create_issue() {
  local title="$1"
  local body="$2"
  echo "Creating issue: $title" >&2
  gh issue create --repo "$REPO" --title "$title" --label "review" --body "$body"
  sleep 2
}

# Ensure the "review" label exists
gh label create "review" --repo "$REPO" --description "Project review and inclusion notice" --color "0e8a16" 2>/dev/null || true

create_issue "[Review] Agents (aiwaves) -- Self-Evolving Autonomous Language Agents" "$(cat <<'BODY'
We have included [aiwaves-cn/agents](https://github.com/aiwaves-cn/agents) in the **Awesome Agent Evolution** list under the **Agent Evolution and Self-Improvement** category.

**Why this project stands out:**
- One of the few frameworks explicitly designed around self-evolving agent behavior
- Data-centric approach to agent autonomy is a unique angle in the ecosystem
- Strong research foundation with practical implementation

@aiwaves-cn -- if any details need correction or you would like to add additional context about the project, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] SEAgent -- Self-Evolving Computer Use Agent" "$(cat <<'BODY'
We have included [SunzeY/SEAgent](https://github.com/SunzeY/SEAgent) in the **Awesome Agent Evolution** list under the **Agent Evolution and Self-Improvement** category.

**Why this project stands out:**
- Addresses the specific problem of agents that improve at computer use through experience
- Autonomous learning from interaction history is directly relevant to agent evolution
- Novel approach combining self-evolution with computer use capabilities

@SunzeY -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Memvid -- Memory Layer for AI Agents" "$(cat <<'BODY'
We have included [memvid/memvid](https://github.com/memvid/memvid) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Elegant single-file approach to agent memory replaces complex RAG pipelines
- Serverless design significantly lowers the barrier for adding memory to agents
- Fast-growing project solving a real pain point in agent development

@memvid -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] nocturne_memory -- Rollbackable Graph Memory for MCP Agents" "$(cat <<'BODY'
We have included [Dataojitori/nocturne_memory](https://github.com/Dataojitori/nocturne_memory) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Rollbackable memory is a unique and useful feature for agent reliability
- Graph-like structured memory provides richer relationships than flat vector stores
- Visual memory inspection makes debugging agent behavior much easier

@Dataojitori -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] mcp-memory-service -- Persistent Memory for Agent Pipelines" "$(cat <<'BODY'
We have included [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Bridges memory with popular agent frameworks (LangGraph, CrewAI, AutoGen)
- Knowledge graph + autonomous consolidation is a sophisticated memory architecture
- REST API design makes it easy to integrate with any agent stack

@doobidoo -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] TeleMem -- High-Performance Agent Memory" "$(cat <<'BODY'
We have included [TeleAI-UAGI/telemem](https://github.com/TeleAI-UAGI/telemem) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Semantic deduplication solves a real problem with agent memory bloat
- Multimodal video reasoning extends memory beyond text
- Drop-in Mem0 replacement lowers adoption friction

@TeleAI-UAGI -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

We also included your [Awesome-Agent-Memory](https://github.com/TeleAI-UAGI/Awesome-Agent-Memory) survey in the list.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Python A2A -- Agent-to-Agent Protocol SDK" "$(cat <<'BODY'
We have included [themanojdesai/python-a2a](https://github.com/themanojdesai/python-a2a) in the **Awesome Agent Evolution** list under the **Agent-to-Agent Protocols** category.

**Why this project stands out:**
- Clean Python implementation of Google's A2A protocol
- Makes inter-agent communication accessible to Python developers
- Growing ecosystem around A2A interoperability

@themanojdesai -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Coral Anemoi -- A2A Communication MCP Server" "$(cat <<'BODY'
We have included [Coral-Protocol/Anemoi](https://github.com/Coral-Protocol/Anemoi) in the **Awesome Agent Evolution** list under the **Agent-to-Agent Protocols** category.

**Why this project stands out:**
- Semi-centralized approach to multi-agent systems is a practical middle ground
- Combines A2A communication with MCP server architecture
- Addresses the real challenge of agent coordination at scale

@Coral-Protocol -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] A2A MCP Server -- Bridging MCP and A2A Protocols" "$(cat <<'BODY'
We have included [GongRzhe/A2A-MCP-Server](https://github.com/GongRzhe/A2A-MCP-Server) in the **Awesome Agent Evolution** list under the **Agent-to-Agent Protocols** category.

**Why this project stands out:**
- Bridges two important protocol ecosystems (MCP and A2A)
- Enables Claude and other MCP-compatible assistants to interact with A2A agents
- Practical integration tool for the growing agent protocol landscape

@GongRzhe -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] ATLAS MCP Server -- Neo4j Task Management for Agents" "$(cat <<'BODY'
We have included [cyanheads/atlas-mcp-server](https://github.com/cyanheads/atlas-mcp-server) in the **Awesome Agent Evolution** list under the **Agent-to-Agent Protocols** category.

**Why this project stands out:**
- Three-tier architecture (Projects, Tasks, Knowledge) is well-designed for agent workflows
- Neo4j-powered graph structure enables complex task relationships
- Deep Research integration adds another dimension to agent capabilities

@cyanheads -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Mangaba AI -- Minimal A2A and MCP Agent Framework" "$(cat <<'BODY'
We have included [Mangaba-ai/mangaba_ai](https://github.com/Mangaba-ai/mangaba_ai) in the **Awesome Agent Evolution** list under the **Agent-to-Agent Protocols** category.

**Why this project stands out:**
- Minimalist approach to agent creation with both A2A and MCP support
- Lower barrier to entry for developers new to agent protocols
- Clean implementation that demonstrates protocol integration

@Mangaba-ai -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Agency Swarm -- Multi-Agent Orchestration" "$(cat <<'BODY'
We have included [VRSEN/agency-swarm](https://github.com/VRSEN/agency-swarm) in the **Awesome Agent Evolution** list under the **Multi-Agent Frameworks** category.

**Why this project stands out:**
- Focus on reliability in multi-agent orchestration is a key differentiator
- Agent team concept provides intuitive abstractions for complex workflows
- Active community and regular updates

@VRSEN -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] ROS-LLM -- Embodied Intelligence with LLMs" "$(cat <<'BODY'
We have included [Auromix/ROS-LLM](https://github.com/Auromix/ROS-LLM) in the **Awesome Agent Evolution** list under the **Embodied AI** category.

**Why this project stands out:**
- Bridges the gap between LLMs and physical robot control via ROS
- Natural language interactions for robot operation is a compelling use case
- Quick integration (10 minutes claim) lowers experimentation barrier

@Auromix -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] OpenClaw QA -- Developer Community for AI Agent Exploration" "$(cat <<'BODY'
We have included [ythx-101/openclaw-qa](https://github.com/ythx-101/openclaw-qa) in the **Awesome Agent Evolution** list under the **Community and Knowledge** category.

**Why this project stands out:**
- Real-world practices rather than theory -- answers based on actual implementation experience
- Covers memory systems, multi-agent architectures, and agent evolution from practitioner perspective
- Novel community format combining GitHub Issues with automated Q&A pipeline

@YuLin807 -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Learn Agentic AI -- Comprehensive Learning Resource" "$(cat <<'BODY'
We have included [panaversity/learn-agentic-ai](https://github.com/panaversity/learn-agentic-ai) in the **Awesome Agent Evolution** list under the **Community and Knowledge** category.

**Why this project stands out:**
- Comprehensive coverage of the agentic AI stack (Agents SDK, Memory, MCP, A2A, Knowledge Graphs)
- DACA Design Pattern provides a structured learning path
- Includes practical cloud-native deployment (Dapr, Kubernetes)

@panaversity -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Aetherius -- Local AI Assistant with Long Term Memory" "$(cat <<'BODY'
We have included [libraryofcelsus/Aetherius_AI_Assistant](https://github.com/libraryofcelsus/Aetherius_AI_Assistant) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Completely private, locally-operated approach addresses a key concern in agent deployment
- Realistic thought formation using open source LLMs is a unique feature
- Qdrant-based vector DB provides solid memory infrastructure

@libraryofcelsus -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

create_issue "[Review] Awesome-AI-Memory -- Research Survey on Agent Memory" "$(cat <<'BODY'
We have included [IAAR-Shanghai/Awesome-AI-Memory](https://github.com/IAAR-Shanghai/Awesome-AI-Memory) in the **Awesome Agent Evolution** list under the **Memory Systems** category.

**Why this project stands out:**
- Systematic survey of AI memory research covering LLM and Agent memory
- Continuously updated knowledge base with papers, frameworks, and benchmarks
- Covers both theoretical foundations and practical system design

@IAAR-Shanghai -- if any details need correction or you would like to add additional context, feel free to comment here or submit a PR.

List: https://github.com/EvoMap/awesome-agent-evolution
BODY
)"

echo "All review issues created successfully."
