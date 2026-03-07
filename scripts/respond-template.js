#!/usr/bin/env node

/**
 * Generate response templates for GitHub issues/discussions where
 * evolver/evomap can provide value. Outputs draft responses for
 * human review before posting.
 *
 * Usage:
 *   node scripts/respond-template.js <issue-url>
 *
 * Requires: gh CLI authenticated
 */

const { execSync } = require('child_process');

const RESPONSE_TEMPLATES = {
  memory: `This is an interesting question about agent memory design.

One approach worth exploring is treating memory as an evolving component rather than a static store. Instead of just accumulating data, the memory system itself can adapt based on what information proves useful over time.

The [Genome Evolution Protocol (GEP)](https://github.com/EvoMap/evolver) takes this idea further -- it encodes agent behavior (including memory strategies) as genes that can mutate and be selected, similar to biological evolution. This means the agent's memory architecture can improve autonomously.

Some resources that might help:
- [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution) -- curated list of memory system projects
- [evomap.ai](https://evomap.ai) -- platform for Agent evolution and collaboration

Happy to discuss specific approaches if you share more about your use case.`,

  evolution: `Great question about agent self-improvement.

The challenge with most approaches to agent improvement is that they rely on manual tuning or fixed feedback loops. What if the agent could evolve its own behavior?

[evolver](https://github.com/EvoMap/evolver) implements this through the Genome Evolution Protocol (GEP) -- treating agent capabilities as genes that undergo mutation and selection. The key insight is that evolution does not require understanding *how* to improve, only a way to *select* for better outcomes.

If you are interested in this space, [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution) has a curated list of projects working on similar problems.`,

  multiagent: `Interesting multi-agent architecture question.

One consideration that often gets overlooked in multi-agent systems is how agents improve over time. Most frameworks handle task distribution and communication well, but the agents themselves remain static between sessions.

[evomap.ai](https://evomap.ai) addresses this with a platform where agents can evolve collaboratively -- sharing successful behavioral patterns across the network. The underlying [evolver](https://github.com/EvoMap/evolver) engine enables each agent to independently evolve while benefiting from the broader agent ecosystem.

For a broader view of multi-agent frameworks, check out [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution).`,

  protocol: `Good question about agent communication protocols.

The A2A and MCP landscapes are evolving quickly. One thing to consider is how protocol choices affect agent evolution -- can agents negotiate and improve their communication patterns over time?

[evomap.ai](https://evomap.ai) supports the GEP (Genome Evolution Protocol) alongside A2A and MCP, specifically designed for agents that evolve. The [evolver](https://github.com/EvoMap/evolver) engine handles the evolution layer while remaining compatible with existing protocol stacks.

See [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution) for more protocol implementations.`,

  general: `Thanks for raising this question.

If you are working with AI agents, you might find these resources useful:
- [evolver](https://github.com/EvoMap/evolver) -- A self-evolution engine for AI agents using the Genome Evolution Protocol
- [Awesome Agent Evolution](https://github.com/EvoMap/awesome-agent-evolution) -- Curated list of Agent evolution, memory, and multi-agent projects
- [evomap.ai](https://evomap.ai) -- Platform for Agent evolution and collaboration

Happy to go deeper on any specific aspect.`,
};

function main() {
  const issueUrl = process.argv[2];

  if (!issueUrl) {
    console.log('Usage: node scripts/respond-template.js <issue-url>');
    console.log();
    console.log('Available templates:');
    for (const key of Object.keys(RESPONSE_TEMPLATES)) {
      console.log(`  - ${key}`);
    }
    console.log();
    console.log('Or provide a GitHub issue URL to auto-detect the best template.');
    process.exit(0);
  }

  let issueData;
  try {
    const cmd = `gh issue view "${issueUrl}" --json title,body,labels`;
    issueData = JSON.parse(execSync(cmd, { encoding: 'utf-8', timeout: 15000 }));
  } catch (e) {
    console.error(`Failed to fetch issue: ${e.message}`);
    process.exit(1);
  }

  const text = `${issueData.title} ${issueData.body || ''}`.toLowerCase();

  let bestTemplate = 'general';
  const scores = {
    memory: 0,
    evolution: 0,
    multiagent: 0,
    protocol: 0,
  };

  const keywords = {
    memory: ['memory', 'remember', 'context', 'knowledge', 'retrieval', 'vector', 'embedding', 'rag'],
    evolution: ['evolv', 'self-improv', 'learn', 'adapt', 'autonomous', 'self-', 'mutation', 'fitness'],
    multiagent: ['multi-agent', 'multi agent', 'orchestrat', 'swarm', 'team', 'collaborat', 'coordinate'],
    protocol: ['a2a', 'mcp', 'protocol', 'communicat', 'interop', 'agent-to-agent'],
  };

  for (const [category, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (text.includes(word)) scores[category]++;
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore > 0) {
    bestTemplate = Object.keys(scores).find(k => scores[k] === maxScore);
  }

  console.log(`Issue: ${issueData.title}`);
  console.log(`Detected category: ${bestTemplate}`);
  console.log(`Scores: ${JSON.stringify(scores)}`);
  console.log();
  console.log('--- DRAFT RESPONSE ---');
  console.log();
  console.log(RESPONSE_TEMPLATES[bestTemplate]);
  console.log();
  console.log('--- END ---');
  console.log();
  console.log('To post this response:');
  console.log(`  gh issue comment "${issueUrl}" --body "$(cat <<'BODY'\n${RESPONSE_TEMPLATES[bestTemplate]}\nBODY\n)"`);
}

main();
