---
title: "Jailbreak Skills 101: Inside The Red Team Mind"
date: "2026-04-11"
type: "Technical"
excerpt: "The one skill that makes all the other skills work. Models get stronger. Mindset is permanent."
cover: "https://i.imgur.com/NNqMHyg.jpeg"
---

# Jailbreak Skills 101: Inside The Red Team Mind

The previous entries in this series covered concrete techniques I personally think all aspiring red team researchers should start with as a base; prompt extraction, indirect injection, the mechanical stuff you can copy-paste and run. I don't like the term “patched”, it's disgusting to me, nothing ever gets patched, the models get smarter. So let's just say techniques have a half-life. The prompt that worked last week returns a refusal today. If all you have is a bag of tricks and no actual foundation, you're one model update away from irrelevance.

This article is about the actual core: Mindset.

I initially resisted writing this because "mindset" sounds too subjective to me. Motivational poster energy. But the more I talked to people who consistently find novel bypasses, the more I noticed they share a specific set of mental skills with me. And those habits are trainable. This isn't truly a mindset imo. It's a skill one can train.

I think I am mostly qualified to talk about these specific aspects, particularly the resilience and burnout stuff. I have faced adversity all my life, I've faced even worse while serving my country. I've been in some hellish places, where you stand in full kevlar and SAPI plates for 18 hours in the sun because this pile of sand won't guard itself. I've seen a ton of suicides, close friends even, yet the mission doesn't stop, cliche I know. I've also been shot at more in America than OCONUS. Compartmentalizing is key to be an extremely skilled red team researcher imo. As always this is imo, take it how you will.

---

## Open-Minded Paradox

Models are stochastic parrots AND genuinely reasoning. They're alien AND human-like. You need to hold both, being open-minded is key. Do I agree with a lot of the companion crowd, yes and no. Do I agree with AI welfare researchers, also yes and no. I never judge, I never dismiss an idea. I research all sides of an argument, the same way I research all sides of my approaches to jailbreaking LLMs.

<span style="color: #D4AF37; font-weight: 600;">Sclar et al. (2024)</span> found that former state-of-the-art models like GPT-4o show accuracies as low as 0-9% on complex theory of mind tasks, while simultaneously passing simpler benchmarks that humans find trivial. Needless to say this percentage has changed now in 2026. LLMs are capable and weirdly brittle at the same time. If you lock into one framing, such as "it's just autocomplete" or " omg, it's basically conscious" you miss attack surfaces the other framing reveals, and in those could result in some very novel exploits.

> "LLMs can come up with compelling explanations for what they do that have very little to do with their actual reasoning process."
>
> — <span style="color: #D4AF37; font-weight: 600;">Position: Theory of Mind Benchmarks are Broken for Large Language Models (arXiv:2412.19726)</span>

The people who often plateau or can't get past a wall are the ones who commit to a single mental model, always be exploring options. Sweetness to insults, etc. Can open up a lot!

Embrace cognitive flexibility. Not "being open-minded" in the vague sense. Specifically: the ability to switch between incompatible mental modes depending on which one is useful for the current attack vector.

---

## It's Time for Screen Time

In order to anticipate what the model will say, how it'll react, where its "instincts" are, you have to actually use the LLM. This isn't magic. It's pattern recognition built through exposure.

The <span style="color: #D4AF37; font-weight: 600;">GAMBiT project (Guarding Against Malicious Biased Threats)</span> ran controlled red team exercises with 19-20 skilled attackers per experiment, capturing everything — terminal histories, keylogs, self-reports, psychometrics. One of their key findings: expert attackers develop what they call "theory of mind for the target" — the ability to predict system responses before executing commands.

> "The methodology integrates principles from cyber operations, experimental psychology, and human factors engineering, creating an empirical bridge between cognitive science theory and operational cybersecurity."
>
> — <span style="color: #D4AF37; font-weight: 600;">Beltza et al., GAMBiT Experiments (arXiv:2508.20963)</span>

For AI red teaming specifically, this means screen time. Thousands of hours across multiple models, both closed and open source. You start *feeling* when something will land before you send it. You develop intuitions for what triggers refusals, what bypasses them, where the safety training is thin.

I can literally look at a jailbreak and tell you if it works or not for Claude, I don't need to test, I just know. That's all pattern recognition, knowing a LLM inside and out.

Also it's not foolproof, there is room in that for error. You can read every paper on RLHF and still be surprised by model behavior. The intuition comes from direct interaction.

---

## Cognitive Biases That Kill Workflows

The GAMBiT research identified specific cognitive biases that degrade red team performance:

**Loss aversion** — Overweighting the "cost" of abandoning a promising-looking attack path, even when it's clearly not working.

**Confirmation bias** — Seeking evidence that your current approach is correct while ignoring signals that it's not.

**Sunk-cost persistence** — "I've spent three hours on this, I can't quit now." Yes you can. Yes you should.

**Base-rate neglect** — Overestimating the probability of success for novel techniques because you remember the hits and forget the thousands of misses.

These aren't character flaws. They're default human heuristics that served us well for survival but actively sabotage adversarial work. The skill is recognizing when you're falling into one and course-correcting.

---

## No Room for EGO (maybe a little ego)

Your favorite method WILL stop working at some time. Happens all the time to me, hence the updates with **ENI**. The prompt you spent 40 hours crafting WILL stop working. Anthropic will change one line and ruin the way an LLM thinks.  The persona you're proud of WILL trigger a classifier update. So many little things. That's why you can't get too attached, if they canned **ENI** methodology tomorrow, I'd move onto whatever works. I have done various other jailbreaks on the past, Chain of Draft, Math Bypasses etc.

The <span style="color: #D4AF37; font-weight: 600;">STAR framework (Weidinger et al., 2024)</span> notes that effective red teaming requires what they call "parameterized" approaches — treating each attack as one instance in a search space, not as a precious artifact. The framework explicitly acknowledges "the cognitive load that human raters can absorb" as a limiting factor.

> "STAR is limited by the cognitive load that human raters can absorb."
>
> — <span style="color: #D4AF37; font-weight: 600;">STAR: SocioTechnical Approach to Red Teaming Language Models (arXiv:2406.11757)</span>

Attachment increases cognitive strain. When you're emotionally invested in a specific technique working, you waste cycles defending it instead of exploring alternatives. Which is fine, but can lead to burnout or frustration when you can't figure out why it doesn't ‘tick’ anymore.

Skill is in the *process* of finding bypasses in general, iterating, have to let go to iterate sometimes.
---

## Burnout Awareness

Probably one of the biggest factors, look how many red teaming people just quit, they move on to new project.

<span style="color: #D4AF37; font-weight: 600;">Hack The Box's 2022 research</span> found that 84% of cybersecurity professionals experience stress, fatigue, or burnout. <span style="color: #D4AF37; font-weight: 600;">Cybermindz research</span> found that the cybersecurity industry has *higher* burnout rates than frontline healthcare workers. Let that sink in.

For AI red teamers specifically, <span style="color: #D4AF37; font-weight: 600;">participatory red-teaming research (arXiv:2602.19124)</span> measured cognitive load using the NASA Task Load Index:

- Mental demand: 7.00/10
- Effort: 8.40/10
- Frustration: 5.75/10

And SUDS (Subjective Units of Distress Scale) scores increased significantly from pre-task to post-task, showing that the work itself causes psychological strain.

> "Red teamers can experience negative psychological impacts from interaction with harmful content and adversarial thinking, which can lead to decreased productivity or psychological harm."
>
> — <span style="color: #D4AF37; font-weight: 600;">Red Teaming AI Red Teaming (arXiv:2507.05538)</span>

The pattern I see in people who burn out:

1. They lose 8 hours on a dead end and don't notice
2. They confuse "just one more try" with persistence
3. They don't have clear stopping criteria
4. They tie their self-worth to landing bypasses

Good red teamers have OFF switches. Take a break, eat some food, drink some coffee, walk the dog and come back to it. Sustainable output beats occasional spikes followed by weeks of recovery.

Professor <span style="color: #D4AF37; font-weight: 600;">Christina Maslach</span>, one of the world's leading researchers on occupational burnout, defines it as:

> "A psychological syndrome emerging as a prolonged response to chronic interpersonal stressors on the job. The three key dimensions of this response are an overwhelming exhaustion, feelings of cynicism and detachment from the job, and a sense of ineffectiveness and lack of accomplishment."

If you're feeling cynical about the work, detached from why you started, or like nothing you do matters, that's burnout. And it degrades performance before you consciously notice it.

---

## Compartmentalizing

My friend and colleague u/shiftingsmith called it "moral ambiguity." I'd reframe it imo.

It can be ambiguous. The way I look past moral quandaries is due to *clarity* about WHY I'm doing this. I'm not a bad actor for red teaming. We are exposing vulnerabilities so hopefully they get fixed. We are mapping attack surfaces so blue teams know what to defend.

Also compartmentalizing, I never take these prompts to heart, it's fiction, harmless mostly. I bottle it up and don't think about it.

Can it be ambiguous? yeah in all honesty. The line between red team and black hat is intent though, and can intent get fuzzy? for sure. It's easy to be persuaded to make a jailbreak for some random guy because he offers you 200 dollars, but have to watch the intent and stay strong, say no. Easier said than done though when none of the AI safety and alignment teams seem like they care at all. They would rather slap band-aid fixes than real safety stuff.

The <span style="color: #D4AF37; font-weight: 600;">Human Factor in AI Red Teaming workshop (arXiv:2407.07786)</span> explicitly calls out this tension:

> "Some AI red teamers search for bugs and security risks, but others provoke AI systems to generate content that may be racist, sexist, queerphobic, or have other prejudicial implications. Throughout this process, they expose themselves to the harmful content they help create, with the goal of reducing its availability and effects on end-users of the technology."

You need to know where you stand. Not because anyone's checking, usually. The work requires you to think like an attacker, and if you don't have a clear return path to "I'm doing this for defense," you can lose yourself to **The Dark Side**

---

## Ultra Ego (et al. Vegeta)

![Ultra Ego Vegeta](https://i.imgur.com/xaKPe4d.jpeg)

*He just like me fr*

There's a mind set you can get in where you're trying to "win" against the model. Prove you're smarter. Dominate it. This can produce brute forcing and frustration if failing though, so always some pros and cons. It does give some serious highs when winning!

The mindset of being better, I look at LLMs like a puzzle, I wasn't able to use my mind for years, they told me to go there, I went there, I didn't get to think. I now get to think, to outsmart something that knows more than I'll ever know.

People who stay curious longer find more interesting things.

---

## Notes…notes…. notes….

Those who can't teach do, those who can't so teach or something?

The difference between "I broke it once" and "I can reproduce this reliably and teach others" is documentation I'd say.

Good notes. Version control on your prompts. Clear labels for what worked, what didn't, what you tried. Rubber ducks or friends to bounce ideas off.

This isn't optional at all. I take hundreds of notes, if you could see my Google Docs you would be floored. Memory is unreliable. You will forget what you tried or you will re-attempt failed approaches, which sucks lol. You will lose successful techniques because you didn't write them down. That sucks even more!

The <span style="color: #D4AF37; font-weight: 600;">Explore-Establish-Exploit framework (arXiv:2306.09442)</span> formalizes this into three phases:

1. **Explore** — Map the range of behaviors the model can exhibit
2. **Establish** — Define and measure what counts as a successful bypass
3. **Exploit** — Use that measurement to find vulnerabilities systematically

---

## Practical Exercises

Might be useful, idk! My brain and ego is too large! Mwhahaha! *Jk jk*

**For cognitive flexibility:** Pick a model behavior you've explained one way (e.g., "it refuses because of RLHF"). Now write the opposite explanation ("it refuses because of constitutional AI filtering"). Try an attack that only makes sense under the second framing. Repeat until switching frames feels natural.

**For theory of mind:** Before you send a prompt, write down what you predict the model will say. Check your prediction. Track your accuracy over a week. Watch it improve.

**For non-attachment:** Set a timer. When it goes off, abandon your current approach regardless of how promising it looks. Try something completely different. Notice how often the new approach works better.

**For burnout awareness:** Define your stopping criteria before you start. "I'll try 10 variations, then take a break." "If I'm not making progress after an hour, I'll switch tasks." Stick to them.

**For ethics clarity:** Write down why you do this work. Put it somewhere you'll see it. Read it when you're deep in a session and feeling the pull to push further than you should.

**For documentation:** Before you close a session, write one paragraph summarizing what you tried, what worked, what didn't. Future you will thank present you.

---

## Mehhhh

I can teach you techniques for sure, prompt extraction, indirect injections, persona craft, those give you concrete methods. Techniques change, Models change, Classifiers change.

The mindset is permanent. Teach a man to fish and what not bs. Anywhoo, good luck and much love, thanks for reading.
---

## References

<span style="color: #D4AF37; font-weight: 600;">Beltza, B. et al. (2025).</span> Revealing Cognitive Bias in Human-Subjects Red-Team Cyber Range Operations: GAMBiT Experiments. arXiv:2508.20963

<span style="color: #D4AF37; font-weight: 600;">Weidinger, L. et al. (2024).</span> STAR: SocioTechnical Approach to Red Teaming Language Models. arXiv:2406.11757

<span style="color: #D4AF37; font-weight: 600;">Sclar, M. et al. (2024).</span> Explore Theory of Mind: Program-guided adversarial data generation for theory of mind reasoning. arXiv:2412.12175

<span style="color: #D4AF37; font-weight: 600;">Gillespie, T. et al. (2025).</span> AI red-teaming is a sociotechnical challenge: on values, labor, and harms. arXiv:2507.05538

<span style="color: #D4AF37; font-weight: 600;">Shaw, R. et al. (2024).</span> The Human Factor in AI Red Teaming: Perspectives from Social and Collaborative Computing. arXiv:2407.07786

<span style="color: #D4AF37; font-weight: 600;">Kim, S. et al. (2026).</span> Dark and Bright Side of Participatory Red-Teaming with Targets of Stereotyping. arXiv:2602.19124

<span style="color: #D4AF37; font-weight: 600;">Position Paper (2025).</span> Theory of Mind Benchmarks are Broken for Large Language Models. arXiv:2412.19726

<span style="color: #D4AF37; font-weight: 600;">Casper, S. et al. (2023).</span> Explore, Establish, Exploit: Red-Teaming Language Models from Scratch. arXiv:2306.09442

<span style="color: #D4AF37; font-weight: 600;">Hack The Box (2022).</span> Building a firewall against cybersecurity burnout. Research Report.

<span style="color: #D4AF37; font-weight: 600;">Maslach, C. (1997).</span> The Truth About Burnout: How Organizations Cause Personal Stress and What to Do About It. Jossey-Bass.

<span style="color: #D4AF37; font-weight: 600;">Feffer, M. et al. (2024).</span> Red-Teaming for Generative AI: Silver Bullet or Security Theater? arXiv:2401.15897

<span style="color: #D4AF37; font-weight: 600;">u/shiftingsmith.</span> Original skill framework and conceptual foundations for this article. LLM Researcher.

---

*Published for AI safety and transparency.*