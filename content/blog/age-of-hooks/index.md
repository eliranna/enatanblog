---
public: false
type: article
title: "The Age of Hooks: Building Domain-driven Frontends"
date: "2020-09-28T22:40:32.169Z"
description: Applying Clean architecture and Domain-driven Design to form ultra-scalable domain-driven frontends. Applying Clean architecture and Domain-driven Design to form ultra-scalable domain-driven frontends.
---

***Component-driven Design***

Hey everyone, my name is Eliran Natan and Im a software Architect at Axonius, and I have been building Frontends for numerius companies in numerius domains during the past 10 years, and today I wish to talk about Domain Driven Frontends. 

But before we dive in into the meaning of that, I would like to share with you an intrasting phenomena that ofren enounter when we talk about frontend architecture. 

When reading about software architecture, whether its online or in textbooks, it is not rare to encounter these monumental patterns and architectural styles such as DDD, Clean architecture, CQRS, Event Sourcing, Microservices, and such. These are all sophisticated ways of tackling the complexity of business logic and building resilient, scalable systems that can be maintained by autonomous teams. However, unlike the backend, the frontend is often regarded as this simplistic monolithic layer that can be composed of components and, perhaps, some state-management solution. This has probably something to do with the belief that, while business logic is vast and complex, presentation logic is thin and simple (Form validations, notifications, and such). And this might have been true like 10 years ago, but the past years show that things are different. Now that might have been true like 10 years ago, but today's reality is differet. UIs are no longer just forms and button, but more like apps or games, that are required to deliver an added value to users, such value that is not part of the actual domain logic. This added value is often translated into complex presentation logic. As a meeter of fact, the more add value we wish to give our users, the complex our frontend becomes.

As an example, lets say our platform supports a query language that allows users to retrive complex data. We wish to deliver an intuitive way of building queries, so we built this graphical query builder, where users can drag and drop entities and connect them together in different ways. Its quite usefull for cybersecurity platforms. This UI introduces a whole new vucabulary of new terms such as vertexes and edges, which are not part of the bussiness logic. in fact, its like introducing a whole new Domain, with new entities and dynamics between them. This is what I call, the presentation Domain. 

let's take a look at this graphical query builder. It allows the user to drag and drop entities onto a canvas, and connect these entities with different types of relations. It's a commonly used way to assist the user in building complex queries, and the result of this process is a raw string in some low-level language that the backend expects. This interface introduces a whole new vocabulary of terms and concepts, such as vertexes and edges, which are not part of the business model. I call it the presentation domain. 

Unfortunately, leading UI frameworks have been training us, in a sense, to think in terms of components. This allowed us to efficiently produce responsive interfaces with minimal effort, but also introduced numerous problems. These problems are related to the fact that the presentation logic is not a first-class citizen of the frontend application. 

Let's list the four main problems that frontends are often encountered at scale: 

- It is difficult to test vast and complex components, especially when these components are involved in asynchronous processes, global state changes, and other side effects. It would have been easier to test pure functions, for example. 

- These frontends are not very extensible, sharable, or reusable. When organizations grow they often have to support different platforms, persistence solutions or move between frameworks, and because presentational logic is often tangled with the underlying framework and infrastructure, organizations usually have to rewrite entire apps which doubles the maintenance work and limits agility. 

- These frontends are not naturally splittable into autonomous business contexts. We often see an arbitrary division of responsibility between teams. This split is sometimes based on pages or components. However, feature requests often fall on the responsibility areas of multiplay teams, which then have to collaborate a lot and coordinate their efforts. 

- And, perhaps the deepest problem of all - The presentation logic is not expressed in the language of the presentation domain. We usually see synthetic structures and made-up terms that are difficult to follow. And because user stories are expressed in presentation domain language, they have to be translated into technical terms with much effort. 

***The What and the How***

The root cause of the above issues has something to do with the fact that we keep mixing the WHAT with the HOW. Frontends end up as a mixture of presentational logic and implementation details. What we really want is a layer of pure presentational logic that you can plug into the actual infrastructure, whether it is a React app, Vue app, or a mobile app. And not just UIs, but also any persistence solution, such as Rest APIs, Local Storage, Redux Store, Cookies, etc. And in order to ensure that the core app is well isolated, we would need an adapter layer that mitigates presentation logic with actual infrastructure. This concept is heavily inspired by the CLEAN architecture approach, which highlights the imprtance of dependencies should be directed inward.

Lets take an example. One pattern that matches this approch is the MVVM pattern. With MVVM, each view, wheather it is a whole screen or a specific part of the screen is implemented as pure and simple UI component. It revices all the nessesary data and functionality in the appropriate shape from the View Model. The View Model is responsible to arrange data, hold state if nessesary, send actions and retrive data from the Modal. The Model is part of the core app, it is completly abstruct and hold the presentation logic.  





In recent years, leading UI frameworks have realized that presentation logic is not as simple as it was and that there is a need for ways to detach stateful logic from UI components. This has led to new abilities such as Custom Hooks (in React) and Composibles (in Vue), which can be used to elegantly seperate between logic and UI. For instance, it can be used to implement an MVVM pattern. Instead of having components that manages states and data, we can have a View Model that does that by interacting with the actual model. In fact, the View Model acts as the adapter. This forms somethign I call Framework-agnostic frontend, becouse the core app is not concered on the selection of the framework. Another gain here is that our UI components are now slim and simplified. 

So what you saw here is an exampple of how we can lavarage React Hooks to implement patterns that matches the layerd-architecture that we want, such as the MVVM pattern. That solves the problem of testability and reusability. 

But now for the depper problems. 

Now I wish to discuss the design of the core app. 

The first design approch that we can apply is known as <mark>Strategic Domain-driven Design</mark>. This is about distingwishing bwteen parts of the presentation domain according to thier realted bussiness aspect. Lets take the following app as an example. This is a drone delivery app. It allows users to browse and seach products, drop them in the cart, selecting a drone and scheduling a delivery. It also allows them to track the location of the drone, manage thier settings and also get live chat support. One possible modeling could be described as follows -- Enablig users to browse product is a bussiness concern. Enabling users to make an order is another concern. Allowing users to track their delivery and manage it is another concern, and so on. Fidning the optimal split is often not that simple, and an excessive amount of time should be dedicated for brainstorming with domain experts and other stakeholders. 

Once this split is established, domain experts can develope a cohasive languge to describe each context. There is also the process of context mapping, in which the relations between this contexts is established. This is very important to identify places where contexts should share state. 

The first thing that we gain with strategic DDD is simplicity. This approch would massivly simplify your implementation, as each entity in each context is described only in respect to that context. This keeps each entity as simple as possible, and each context isolated from the rest. For example, the user entity is not defind in the catalog context. In the orderign context, users holds a cart with selected product and a selected drone, wherease in the delivery context, users has a list of in-progress deliveries and past deliveries. 

There is a deeper benifit to this. We can now assing a team to own a context. Since each feature request often belong to a certin context, and contexts are isolated from each other, then the owning team can work autonomiusly with little to none coordination with other teams. 

We can take it further with Microfrontends architecture: We can allow teams to build thier own mini-app, and combine this apps in runtime using varuis metodologies that are avaliable today. Each context is represented by a self-contained deployable unit. This would allow teams to choose thier own stack and optimize thier software design. Some would also split the API layer (with the BFF solution) to achive autonomusy on the API level. My point here is that strategic DDD is probebly the best basis for Microservice architecture and BFFs. This is part of a wider theory that relates to Conways Law, by which teams tend to reflect thier own structure in the software they bult, this orgenizing your teams in aligment with bussiness contexts would generate a softwrae that is alighed with bussiness concerns. 

The next tool that we can borrow from Domain-driven Design is the tactical approch. The tactical approch is about modeling a specific bounded context. In this process, we take the terms that were defined in the Strategic stage and model them as Entities, Value Objects and the relationships between them. The key idea is to describe the natural entities and process that happans within this context. Entities are domain objects which have identity and continuity, whereas value objects are ment to describe certin properties of entitis. In additional to value objects, entities also contains behavior. Please notice that the result of this analysis would be different from the result of applying tactical DDD on your actual bussiness logic. As we said, presentation logic would contain additional or different objects from the ones you have in your bussiness logic. (For instance, in most systems, the cart would not even exists in bussiness logic). It is quite challenging to find the correct modelling. I favor the trial and error approch, where we find the best model that we can think of and then write psaudo-code on the basis of this model, and keep iterating until we get the results that we are happy about. 

I think that the most importent part in tactical DDD is identifiying the Aggregates. An Agregate is a group of entities that act as a cohesive unit, which means that they must remain consistent with each other at any point in time. This is why we encapsulate them as a group and the only way to modify this group from the outside is by interacting with the root of the aggregate. This is yet another example of how DDD dectates the implementation alrady in the modeling step. And, from my exprience, this is crucial. It is not rare to encounter apps where presentation logic contains many moving parts that do not always remain consist with each other due to bad design. 

Another pattern that we can be derived from aggregates is repositories. We would always persist entire aggrigates, never dicomposing them into thier fundumental parts. This means that, in this exaple, we will have 3 repositories. This is a rule of thumb known as the "aggrigate per repository" rule.  
























