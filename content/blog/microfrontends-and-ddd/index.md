---
public: true
type: article
title: "The Age of Hooks: Building Domain-driven Frontends"
date: "2020-09-28T22:40:32.169Z"
description: Applying Clean architecture and Domain-driven Design to form ultra-scalable domain-driven frontends. Applying Clean architecture and Domain-driven Design to form ultra-scalable domain-driven frontends.
---

Hello everyone, my name is Eliran Natan and Im a software architect at Axonius. I have been building scalable systems for almost a decade now, and today I wish to talk about Domain-driven Frontends. But before we dive into what that means, I would like to share with you a common phenomana that we often enocounter when we talk about frontend architecture. 

When we read about backend architecture, whther its on text books or online, we often envounter this monumental patterns and approches such as DDD, Clean architecutre, Microservices, CQRS, Event sourcing perheps. These are all powerfull ways to build resiilent scalable systems that can be maintained by multiply autonomius teams. However, unlike with backend, Frontend is usullly discribed as this monolithic simplistic peice of software, which is often a composition of components and perheps some state management solution. Now, this difference has probebly something to do with the assumption that Domain logic, which resides in the backend, is complex while presentation logic is ruther simple. Now, that might have been true 10 years ago, but todays reality is quite differnet. UIs are no longer just forms and buttons. Modern UIs are more resables to games, in the sense that they are built to deliver added value that is not part of the busssness logic and cannot be delivered by the backend. And as we wish deliver more add value, so does the frontend complexity increases. 

Lets take a quick example. Lets say your platform supports some query language that allows users to retrive complex data. This is quite usefull in Cybersecurity dashboards. One way is to ask the user to type the query in some input and send it to the server. This is zero add value, zero complexity. Another way would be to allow users to build expressions by interacting with dropdown boxes and the plus button. This is nice added value that introduces some complexity. A third option would be to offer this graphical drag&drop query builder, that allows users to drop entities onto some canvas, link entities with different kind of relations and hover with entities over the canvas to get visual assistance on where you should or sholdnt drop the entity. You got the point. This is an extrime add value and an extrime complexity to pay. This introduces new concepts like canvas, vertexes and edges with a whole new dynamics between them. In fact, its like we introduce a new Domain. This is what I call a presentation domain. 

So when I say Domain-driven Frontend, I mean Presentation Domain, not Bussiness Domain, which arw two distingwished things. 

Now, unfortunatly, the leading UI frameworks has trained us to think in terms of components, not in terms of presentation domain, which is great, becouse it allowed us to build responsive UIs effecietnly, but it also introduced numeruis problems, especielly becouse the presentation domain is not a first-class citizen of these applications. Lets go thorogh the four main problems that occue in frontends at scale: 

- Testability: Its difficult to test UIs as components have many responsiblity areas and are often enganed in state changes, asychronus processes, and other side effecs. It would be much eaiser to test, lets say, pure functions. 

- Reusbility: When organization grow they usually have to suuport multiply platfroms or to move between frameworks and infrastructrue. However, presentation logic is usully heavilty tangaled with the framework and the infrastructure, that they cannot be seperated. And we see many organizations have to rewrite entire apps to support diffrent platforms while having to maintain these multiply apps. 

- Splittable: We often see this arbitrary devision of responsibility between frontend developers and teams. Somethims its based on owening compoennts, other times it is about owning pages or views. However, feature requests often falls on the responsiblilty area of multiply teams, which then means that these teams have to collabarate and coordinate thier work, which often becoemes a buttle neck especiily at scale. 

- Expressible: This is problbly the deepest problem of all. presentation logic is usually not expressed in terms of the presentation domain. We often see this syntetic and made-up concepts invented by developers, which are difficult to understand, to follow, to maintain, and to document. However, feature requests are often expressed in terms of bussiness domain or presentation domain, which makes it very difficult to translate feature requests into technical tests. 

The root cause of the above issues has something to do with the fact that we keep mixing the WHAT with the HOW. Frontends end up as a mixture of presentational logic and implementation details. 

What we really want is to have this pure layer of presentation logic, which is the core of the app, which represnts the natural entities and processes that happans in our Presentation domain. This layer should be pluggbale to any inftrastructure, such as UI's from different frameworks and platforms and differnet data sources. Ofcurse that we should also have a translation layer that meetigates the core app with infrastructure, ensures that the core app remains independent of implementation detals. This approch is heavily inspired by the CLEAN architecturre, which highlights the importance of dependencies pointing inwards, meaningg that the infra dependent on adapaters, and adapters dependent on core, and never the otherway around. 

An example for pattern that fits to this layerd architecture is the MVVM pattern. Each part of the UI has its own View Model. The View Model handles the state, orgenizes the data as thhe view expects, and exposes functionality that the view requieres, while the view remains simple and stateless. The View Model interacts with the core app API, which is a set of functions that we call usecases. To implement the View Model, we need a way to write statefull logic outside of the context of components, which is exactly the purpose of stuff like Custom Hooks (in React) or Composables (in Vue). This is why Hooks and composables makes it so easy to diteach statefull logic out of components. 

Here, the Cart component is slim and simple, only importing the View Model and extracting data and commands. This makes components which are very easy to test and understand. Then, the viewmodel is a react hook which uses lower level react hooks to maintain state. It interacts with the Model to retrive data and send commands. It also manages errors assuming that the model throws errors and communicate the error to the View. Since the view model is just a composition of functions, it is easy to test. 

Data sources are also part of the infrastructure. This can be server calls, Local Storage, Disk, Cookies and what not. When plugging a data source, one must write a translation layer that converts the datasource interface with the interface that the core expects. We call this layer a Repository. And the interface that the core expects should be defined in the core app, ensuring that the core app is independent of any external definitions. BDW, this is where TypeScript shins - it allows us to write and interact with interfaces. Since we cant import repository implementations directly into our core app, so not to break the rule of inward-pointing dependencies, we have to apply dependency injection to inject the repository implementation into the core app. This is known as inversion of control. Dependency injection can be achived in React by using React Context. The repository will be defined in the context, and the wrapped component could consume the repository and pass it on to the core app. 

SO we have seen that when patterns such as MVVM and Repositories fits to the layerd architecture that we wanted, and together they form loosly cpupled apps with a core that is independent from some underline infrastructure. I call it Framework/Technology-agnostic frontend. 

This solves the testability issue becouse now components are slim and simple, which is esier to test, view models are hooks, which are funtions, the core app is comletly functional and reusable, so it is easy to test and can be tated only once to cover many apps that uses it. It also solves the reuabiliy issue becouse now we can share the core app between different apps. Still, there are deeper problems of splittability and expressbility, which are more relates to how we design our core app.  

So, lets talk about splitability. Strategic DDD is about distingwishing part of the Presentation Domain into subdomains, where each subdomain is represented by a certin bussiness aspect. For instance, in  an ecommerce app that allwos users to search products, put them in a cart, set an order, track the delivery, and get live chat support, we could have the following subdomains: Product, Order, Shipment, Support. Once we have estublshed the split to subdomains, its a chance for domain experts to formulate an unambigius language that describes the terms and processes that happnes within each subdomain to form a respective bounded context. Thus, the presentation Model is infact consists of different isolated bounded contexts. It importet to note that identifing subdomains and modeling thier respective bounded contexts is not easy in most cases. Its about taking the time and effort to brainstorm with domain experts, products desingers and products owner to figure out an effective modeling.

Why do we do this? Well, the first gain is simplicity. Splitting your Presentation logic into bounded contexts would dramaticly simplify your implementation. Since each term in each bounded context is defined only from the prespective of its respective bounded context, then its definition is as simple as possible. For example, from the Product context prespective, the term User would probebly not even exists, whereas from Order prespective, user is someone with a cart full of products and ordering schedule, and from a shipment stand point, user is someone who has a list of on-going orders with thier statues. 

But bounded contexts have a deeper reason. Autonomy. 

In Agile, we work according to user stories. A user story represnet a certin goal that the user wish to achive, described from the user's prespective and in terms of the bussiness. Each Story belongs to a certin bussiness aspects, a sub domain. Therefore, if we split our presentation logic into bounded contexts, then, given a story, we know that imlementing this story would have effect only on that bounded context. Thus, if we orgenize our teams according to bounded contexts, then the owning team can implement a story with little to no interaction with other teams. This makes teams more autonomius. This is part of a wider theory that relates to Conway's law. Conways law states that organizations tends to reflect thier structure into the software they built. Thus, if we want our softwrae to be aliged with bussiness aspects, then we have to orgenize our teams in the same way. 

We can take it further with Microfrontends architecture: We can allow teams to build thier own mini-app, and combine this apps in runtime using varuis metodologies that are avaliable today. Each context is represented by a self-contained deployable unit. This would allow teams to choose thier own stack and optimize thier software design. Some would also split the API layer (with the BFF solution) to achive autonomusy on the API level. One challange in Micro-frontends is to maintain UI consistency, as teams are fully autonomius. This is a gap that should be solved with a Design System, which acts as a single source of thruth for how the different UIs should look and feel. 




