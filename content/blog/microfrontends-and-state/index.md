---
public: false
type: article
title: "Micro-Frontends as Bounded Contexts"
date: "2022-05-09T22:40:32.169Z"
description: A Domain-driven Design approach for correctly identifying Microfrontends to gain maximal autonomy for teams.
---

<div class="preface">
Micro-frontend architecture is about breaking up frontend monoliths into many smaller, more manageable pieces, for the purpose of increasing the effectiveness and efficiency of teams working on frontend code. One of the main motivations for working with Microfrontends is the level of isolation that Microfrontends have from each other, especially since it can potentially make teams more autonomous. However, not every decomposition of Frontend monolith would necessarily maximize this potential. In this post, I discuss a Domain-driven Design approach for correctly identifying Microfrontends to gain maximal autonomy for teams. 
</div>

In Agile, development tasks are often derived from user stories. A User Story is a short, simple description of a goal that a user would like to achieve, described from the perspective of the user and in terms of the business. In many systems, resolving a user story often involves the cooperation and coordination of multiply teams, since implementing the story affects different areas of the software which belong to different teams. This phenomenon is highly related to how organizations construct development teams: We usually encounter an arbitrary/artificial division of responsibility between development teams, such as teams owning components, pages, views, classes, or modules. Since this division is not business-oriented in the sense that it is not aligned with how user stories are organized, then it is less likely that the technical tasks that are required to implement a user story would all fall under the responsibility area of a single team.

#### Autonomy and Conway's Law
A straightforward solution to this problem would be to organize teams around business aspects, rather than around technological concerns. This is based on the realization that a complex domain can be decomposed into sub-domains, where each subdomain represents the main business aspect. By splitting the business domain into foreign and complementary sub-domains we can ensure that each user story would specify a certain business goal that belongs to a certain sub-domain. Hence, Assigning each team to own the area of the software that supports a single sub-domain might be a good approach for improving teams' autonomy. 
However, how it is possible to ensure that the resulting overall software would remain aligned with the team's structure? That is, what ensures that with time, the different areas of the software that are owned by different teams won't become tangled and dependent on each other in a way that would limit the team's autonomy? 

The answer to this question is rooted in what is known as Conway's law. Conway's law states that organizations will always tend to mirror their own structure in the software they built. In accordance, the Inverse Conway maneuver recommends evolving team and organizational structure to promote the desired architecture. Hence, following Conway's law, it is reasonable to assume that by organizing teams around business concerns, the resulted software will remain aligned with business concerns as well, and thus, the dichotomy between responsibility areas of different teams will be preserved.

Going back to micro frontends, the above realization implies that assigning teams with micro frontends, where each team handles a certain concern of the business would make the most sustainable approach in terms of team autonomy. This brings up the question of how can we ensure correct identification and distinction between different subdomains? Wrong modeling could result in teams owning overlapping business responsibility areas, which, in turn, would result in software that is not well dividable due to Conway's law. This is where Domain-driven Design can be applied. 

#### Identifying Bounded Contexts

Strategic Domain-driven Design (Strategic DDD) is a collection of methodologies that concerns the decomposition of a business domain into multiply subdomains, where each subdomain corresponds to a main business concern. The process begins with domain experts identifying the different subdomains which compose the business domain. Once a decomposition has been obtained, domain experts model each subdomain by composing an unambiguous language that aims to capture the natural entities and processes that occur within and from the perspective of that subdomain. This modeling and its resulted software are defined as a Bounded Context. 

For example, consider a standard e-commerce application that allows users to browse and search for products, drop products into a cart, schedule a delivery, track and manage ongoing deliveries, get online support and edit their profile. This application domain can be decomposed into the following subdomains:

- Catalog: Users can browse, search and get information about products. 
- Orders: Users can select products, schedule a delivery and make payments. 
- Deliveries: Users can track and manage on-going deliveris, as well as viewing past deliveries. 
- Support: Users can recive online assistance via a live chat.
- Profile: Users can create and update thier profile, and adjust user settings. 

#### Benifits 







<div class="seperator">
...
</div>
Different bounded contexts can be evolved and implemented independently. That said, bounded contexts are not independent. A system cannot be built out of independent components; the components have to interact with one another to achieve the overarching system goals. The same goes for bounded contexts. Although their implementations can evolve independently, they have to integrate with each other. As a result, there will always be touchpoints between bounded contexts. The process of identifing the relationships between different contexts and defining thier interface is known as <i>Context Mapping</i>. 

Following the above, it appras that the optimal approch for applying Microfrontends architecture in terms of isolation and Autonomy is to applay the Bounded Context pattern to identify an optimal decomposition of the domain model into multiply bounded contexts, where each bounded contexts is associeted with a dedicated Microfrontend. Moreover, using the Context Mapping approch, one could identify and model the interaction between different bounded contexts, and hance, the interaction between microfrontends. 


![](https://i.ibb.co/vhG0pc4/ec.png)
<div class="image-desc">
    A decomposition of a standard e-commerce bussiness domain into subdomains
</div>

The Bounded Context pattern can be applied on each of the resulted subdomains. For example, applying this pattern on the Orders subdomain would form an unambigues language 