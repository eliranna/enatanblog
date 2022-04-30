---
public: false
type: article
title: Reinforcement Learning — Basic Solution Methods
date: "2021-06-21T22:40:32.169Z"
description: Reinforcement Learning is a concept from psychology that can be embedded in machines to derive intelligent decision-making. A fundamental question is how should the machine adapt its behavior as a result of its experience, in the purpose of maximizing the cumulative reward.
---

*Reinforcement Learning is a concept from psychology that can be embedded in machines to derive intelligent decision-making. A fundamental question in implementing Reinforcement Learning in Machines is how should the machine adapt its behavior as a result of its experience, in the purpose of maximizing the cumulative reward? Any algorithm that answers this question is a Reinforcement Learning solution method. The following post concerns the most common approach for addressing Reinforcement Learning — the estimation of a value function.*

![]()

A fundamental concept in most reinforcement learning algorithms is the idea of the value function. Whereas the reward signal indicates what is good in an immediate sense, a value function specifies what is good in the long run. Roughly speaking, the value of a state, with respect to a certain policy, is the total amount of reward an agent can expect to accumulate over the future, starting from that state and following the policy thereafter. Whereas rewards determine the immediate, intrinsic desirability of environmental states, values indicate the long-term desirability of states after taking into account the states that are likely to follow and the rewards available in those states. For example, a state might always yield a low immediate reward but still have a high value because it is regularly followed by other states that yield high rewards.

>"To make a human analogy, rewards are somewhat like pleasure (if high) and pain (if low), whereas values correspond to a more refined and farsighted judgment of how pleased or displeased we are that our environment is in a particular state." 
> <div class="source">— Richard S. Sutton</div>

As mentioned in a [previous post](/reinforcement-learning), the agent can be seemed as discretely traverses an MDP by performing actions in states while collecting encountered rewards. At any given timestamp $t$, the total reward gained by the agent, often called *Return*, can be described as follows:

$$
G_t = R_{t+1}+\gamma R_{t+2} + ...= \sum_{k=0}^{\infty}\gamma ^kR^{t+k+1} \;\;\;\;\;\;\; (1)
$$

Formally, given a policy $\pi$, the value of state $s$ in respect to $\pi$ is defined as follows:

$$
v_{\pi}(s)\doteq\mathbb{E}_{\pi}\left[G_{t}\mathrel{{\mid}{S_t=t}} \right] \;\;\;\;\;\;\; (2)
$$

where $G$, is defined by (1) and $\mathbb{E}$, with respect to $\pi$ is the *probabilistic expectation* of $G$ under policy $\pi$ (considering a possibly stochastic environment). Values can also be assigned to a *state-action pair*, not only to states. The value of a state-action pair $(s,a)$ under a certain policy $\pi$ is the expected return for starting at that state, performing that action, and following that policy thereafter, or formally:

$$
q_{\pi}(s,a)=\mathbb{E_\pi}[G_{t} |  S_t=s, A_t=a]\;\;\;\;\;\;\; (3)
$$

Most of the reinforcement learning algorithms are structured around estimating value functions (Other approaches include *Evolutionary algorithms* or *Policy Gradient Methods*, which are not discussed in this article). Once the value function has been estimated, the agent can use it to act in the environment in a near-optimal way — Starting from any state, the agent can use the state-value function to greedily select the action that leads to the state with the highest value, or, alternatively, to use the action-value function to greedily select the action that has the highest value.

In principle, there are numerous ways of computing the value function from a given MDP, such as algebraically resolving a system of nonlinear equations which express the MDP, or by using Dynamic Programming methods such as *Value Iteration* or *Policy Iteration*. Such approaches apply mathematical manipulation on the MDP components (states, actions, transitions, and rewards) to extract optimal solutions, with no interaction between the agent and the environment, under the assumption that the full description of the MDP is accessible and is fully known to the agent. However, those analytic approaches are not suitable for most cases where reinforcement learning is applied, since they require a full model of the environment and do not imitate the trial and error learning model. Therefore, we would be interested in solution methods that follow the trial and error paradigm. Such methods assume that the full model of the environment is not given (often known as model-free) and that only by interacting with the environment, the agent can gradually estimate the value function.

###### Monte Carlo
A basic example of such an algorithm is the *Monte Carlo method*. Roughly speaking, the algorithm estimates the value of each state-action pair by averaging the returns observed after performing the action in the state. As more returns are observed, the average should converge to the expected value. The algorithm starts with an arbitrarily selected policy $\pi$ and from an arbitrarily selected state, performs an arbitrary action, and traverses the MDP following $\pi$ until reaches a terminal state. Such traversal is sufficient to observe, for each state-action pair $(s,a)$ that was encountered, the return (the total reward) that was gained starting of that pair. The algorithm uses this observation to modify the action value — it averages the observed return with the current value of $(s,a)$. To align the policy with the updated value function, the algorithm modifies the policy so it would greedily follow the value function (meaning, choosing to perform actions that has the highest value). The algorithm continues by generating a new episode, now under the improved policy, which, in turn, derives a more accurate value estimation and so on. In this process, both the policy and the value function converge to their optimal values, until sufficient accuracy is reached, or when no more changes occur to the policy and the value function (the state of equilibrium).

[![monte.png](https://i.postimg.cc/X7NSgxSX/monte.png)](https://postimg.cc/RqYDS70z)
<div class="image-desc"></div>

This tactic, where two simultaneous, interacting processes, one making the value function consistent with the current policy (policy evaluation), and the other making the policy greedy with respect to the current value function (policy improvement) is known as general policy iteration (GPI) and is not exclusive for Monte Carlo methods. In fact, almost all reinforcement learning methods are well described as GPI.

Another important factor in the Monte Carlo algorithm is that a new starting point is being randomly selected at the beginning of each episode. If it wasn't the case, and the policy was deterministic, then the agent would have never encountered most state-action pairs. This is the general problem of maintaining exploration, where algorithms that do not perform enough explorative moves would endure an extremely slow convergence rate, and, if the system or the policy are deterministic, they would only be able to reach solutions that are locally optimal, possibly missing-out much better solutions. To obtain a lot of rewards, a reinforcement learning agent must prefer actions that it has tried in the past and found to be effective in producing reward. But to discover such actions, it has to try actions that it has not selected before. The agent has to exploit what it has already experienced to obtain reward, but it also has to explore to make better action selections in the future. This is known as the exploration-exploitation dilemma.

>"The dilemma is that neither exploration nor exploitation can be pursued exclusively without failing at the task."
> <div class="source">— Richard S. Sutton</div>

To address this limitation, it is necessary to add a portion of randomity (noise) to the movement of the agent. Here, such randomity is added by alternating the starting point of the search on each episode. This guarantees that all state-action pairs will be visited an infinite number of times within the limit of an infinite number of episodes.

###### TD-Learning

An obvious drawback of the Monte Carlo algorithm is that it relies on the existence of terminal states, which means that it is not equipped to address tasks that are not episodic. The Temporal-difference (TD) approach is a different method of estimating the value function which does not assume the existence of terminal states, meaning that it can handle tasks that are continuous in nature. Roughly speaking, unlike with the Monte Carlo method, a Temporal-difference algorithm does not waits until an end of an episode in order to adjust the values of encountered state-action pairs. Instead, it modifies those values locally, immediately after each step. More specifically, the agent traverses the MDP, sample encountered values, and gradually shifts those values towards a predetermined target value. This process is based on the following update rule, which characterizes TD-learning:

$$
\mathbf{New} \leftarrow \mathbf{Old} + \mathbf{Learning Rate} \cdot \overbrace{[\mathbf{Target} - \mathbf{Old}] }^{\mathbf{Error}} \;\; (4)
$$

where OldEstimate is the sampled value of a state-action pair, Target is the expected value, and LearningRate is the step-size. One example of a TD algorithm is State-action-reward-state-action (Sarsa). Whereas the Monte Carlo approach averages the values based on empirically measured returns, the Sarsa algorithm makes estimations based on a known mathematical relation that exists between values of state-action pairs in an MDP. This relation states that the expected value of a state-action pair, under a certain policy, is the sum of the immediate reward gained by performing the action and the (discounted) value of the next state-action pair. Formally,

$$
q_{\pi}(s,a)=\mathbb{E_\pi} [R_{t+1}+\gamma q_{\pi}(s_{t+1},a_{t+1}) |  S_t=s, A_t=a] \;\;\;\;\;\;\; (5)
$$

The above equation is known as *Bellman Expectation Equation*. Intuitively, it states that upon performing an action, the agent is expected to receive the immediate reward for performing that action, and the rest of the return is expected to be, by definition, the value of the next state-action pair. This relation expresses the *recursive nature* of values in an MDP. Unlike with relation (3) ,which describes the values of state-actions pairs in terms of global return, relation (5) describes those values using immediately computable terms - the immediate reward gained by performing the action, and the value of the next state-action pair which is determined by the policy. For this reason, relation (5) serves as a basis for the Sarsa algorithm, which relies on local online modifications to the value function, rather than on long-term computations. The Sarsa algorithm uses relation (5) as the target value of each state-action pair. Formally,

$$
q_{\pi'}(s_{t},a_{t}) \leftarrow q_{\pi}(s_{t},a_{t}) + \alpha  \overbrace{[\overbrace {R(s_{t},a_{t},s_{t+1})+\gamma q_{\pi}(s_{t+1},a_{t+1})}^{Target} - q_{\pi}(s_{t},a_{t})] }^{\mathbf{Error}}  \;\;\;\;\;\;\; (6)
$$

where $0 ≤ \alpha ≤ 1$ is the *learning rate*. When $\alpha$ approaches 1, the agent becomes hasty, as it immediately replaces old knowledge with new. Such an agent would not perform well in stochastic environments where samples may drastically vary. On the other hand, a very low learning rate would make an agent a slow learner. This is yet another trade-off that should be fine-tuned, perhaps empirically.

[![Screen-Shot-2021-11-17-at-5-47-47-PM.png](https://i.postimg.cc/NF58gW25/Screen-Shot-2021-11-17-at-5-47-47-PM.png)]()
<div class="image-desc"></div>

Similar to the Monte Carlo algorithm, the Sarsa algorithm uses a GPI approach to simultaneously modify the action-value function according to its policy and to modify its policy to greedily match the action-value function.

To maintain exploration, the algorithm does not purely follow the greedy path defined by action values. Instead, it occasionally performs a random move. Such behavior is known as the ε-greedy policy. As a result, the Sarsa algorithm does not converge to the absolute optimal policy, but to a near-optimal policy that is subject to occasional random actions. Put differently, this algorithm learns the ε-greedy policy, not the greedy policy. Indeed, adding random moves to the search process has downsides because a portion of randomity becomes a part of the result. To address this issue, the value of ε can be gradually decreased during learning, perhaps exponentially, which will ensure convergence to the absolute greedy policy. Another, more sophisticated way of addressing this issue is to allow the agent to estimate values according to a different policy than the one it follows. Those kinds of methods are known as off-policy algorithms, such as the Q-Learning algorithm, which will not be discussed here.

TD-learning methods are strikingly similar to the natural process of learning under uncertainty. For example, the <I>reward prediction error hypothesis of dopamine neuron activity</I> proposes that one of the functions of the phasic activity of dopamine-producing neurons in mammals is to deliver an error between an old and a new estimate of expected future reward to specific areas throughout the brain. This phenomenon was especially noticeable in a series of experiments conducted by Wolfram Schultz. In his experiments, a monkey was exposed to certain stimuli (tone or light), which was then followed by fruit juice, training the monkey to associate the stimulus with the reward of juice. By measuring the activity level of dopamine-producing neurons in the monkey's brain, Schultz has noticed that dopamine activity is increasing when fruit juice is supplied, indicating a difference in expected and actual rewards. Over time, dopamine activity towards the fruit juice was decreasing (meaning that fruit juice becomes expected), and instead, dopamine activity happened as a response to the stimuli itself. This means that the monkey has <I>learned</I> that fruit juice is followed by stimuli. Finally, when fruit juice is suddenly not supplied immediately after the appearance of stimuli, the dopamine activity level drops below baseline (indicating a negative difference between expected and actual rewards, a disappointment). This example emphasizes the basic idea of TD-learning — Learning is the process of narrowing down the gap between predictions and reality  ■