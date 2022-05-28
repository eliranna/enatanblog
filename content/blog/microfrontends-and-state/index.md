---
public: false
type: article
title: "Micro-Frontends and Conway's Law"
date: "2022-05-09T22:40:32.169Z"
description: A Domain-driven Design approch for identifying Microfrontends.
---

<div class="preface">
Micro-frontend architecture is about breaking up frontend monoliths into smaller, more manageable pieces, for the purpose of increasing the effectiveness and efficiency of teams working on frontend code. One of the main motivations for working with Microfrontends is the level of isolation that Microfrontends have from each other, especially since it can potentially make teams more autonomous. However, not every decomposition of Frontend monolith would necessarily maximize this potential. 
</div>

In Agile, development tasks are often derived from user stories. A User Story is a short, simple description of a goal that a user would like to achieve, described from the perspective of the user and in terms of the business. In many systems, resolving a user story often involves the cooperation and coordination of multiply teams, since implementing the story affects different areas of the software which belong to different teams. This phenomenon is highly related to how organizations construct development teams: We usually encounter an arbitrary/artificial division of responsibility between development teams, such as teams owning components, pages, views, classes, or modules. Since this division is not business-oriented in the sense that it is not aligned with how user stories are organized, then it is less likely that the technical tasks that are required to implement a user story would all fall under the responsibility area of a single team.

A straightforward solution to this problem would be to <mark>organize teams around business aspects, rather than around technological concerns.</mark> This is based on the realization that a complex domain can be decomposed into sub-domains, where each subdomain represents the main business aspect. By splitting the business domain into foreign and complementary sub-domains, one can ensure that each user story would specify a certain business goal that belongs to a certain sub-domain. Together with Conway's law, which states that <mark>organizations tends to mirror their own structure in the software they built</mark>, it is reasonable to assume that by organizing teams around business concerns, the resulted software will remain aligned with business concerns as well, and thus, the dichotomy between responsibility areas of different teams will be preserved. Hence, Assigning each team to own the area of the software that supports a single sub-domain might be a good approach for improving teams' autonomy.

> "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure." — Melvin E. Conway

Although the above realization is applicable on a monolith frontend, a Micro-frontends architecture would enhance this idea, as it enforces stricter segregation among business concerns, as well as among their respective software. Furthermore, a Micro-frontends architecture would deliver teams with additional autonomy, as it would enable them to select their own technological stack and design patterns.

<div class="article-image">
    <img src="https://i.ibb.co/pJRrBCt/Screen-Shot-2022-05-14-at-2-07-27.png">
</div>

A key takeaway is that it is not absolutely necessary to apply a Microfrontend architecture as a means for organizing teams and software that is aligned with business concerns, although Microfrontends can enhance this idea. On the other hand, if a Microfrontend architecture is being considered, for some reason, then <mark>Strategic Domain-driven Design should act as the main guideline in identifying Microfrontends.</mark>

<!---

Strategic Domain-driven Design is a toolkit that concerns the decomposition of a business domain into multiply subdomains, where each subdomain corresponds to a main business concern. The process begins with domain experts identifying the different subdomains which compose the business domain. Once a decomposition has been obtained, domain experts model each subdomain by composing an unambiguous language that aims to capture the natural entities and processes that occur within and from the perspective of that subdomain. This modeling, known as Bounded Context, acts as a conceptual boundary and has the ability to evolve independently of other contexts.  

A Bounded Context can serve as a solid logical ground for a simpler implementation of the respective Microfrontend - As Bounded Context terminology is defined from the perspective that contains bounded context while masking away any additional concerns that are irrelevant within this context, it can dramatically simplify the associated Microfrontend implementation if this implementation is directly derived and consistent with the context's terminology. Furthermore, Bounded Contexts are formed around a cohesive unambiguous language that is defined by domain experts and that all stakeholders agree upon, which can drastically improve the quality of communication between stakeholders, reduce the likelihood of conflicts around terminology, and reduce the translation overhead of user stories into technical assignments. 

By aligning Microfrontends and thier owning teams with domain concerns, Microfrontends can be seen as technical implementations of thier respective Bounded Contexts, as the structure, terminology and relations between contexts can be reflected in the associeted Microfrontend implementation. If fully adopted, this approch enhances domain-oriented code which is highly maintainable. 

#### Micro-Frontends Communication and Context Mapping

Although Microfrontends should remain as isolated as possible from each other, it is not rare to find use cases where Microfrontends have to exchange information between them. In order to identify such use cases and to formalize communication contracts, it may be helpful to apply the Context Mapping pattern to the respective Bounded Contexts, which is a DDD process of identifying the relationships between different contexts and defining their interface. The technical communication between Microfrontends should follow patterns that keep Microfrontends loosely coupled with each other, such as pub/sub asynchronous messaging. 

#### Tactical Domain-driven Design
Tactical DDD patterns, such as the aggregate pattern, can be as well applied to presentation logic to further increase the code alignment with the model and to enhance a better alignment with domain concepts. However, these patterns are suitable for Framework-agnostic Frontends, where presentation logic is properly segregated from infrastructure implementation details.
*/

--->



