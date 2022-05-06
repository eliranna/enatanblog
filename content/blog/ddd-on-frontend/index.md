---
public: true
type: article
title: "The Presentation Domain"
date: "2021-04-21T22:40:32.169Z"
description: Applying Domain-driven Design in Frontend development.
---

We’ve seen significant benefits from applying Domain-driven Design, Clean architecture, and Microservice architecture for building enterprise applications, which has allowed us to structure teams based on business capabilities, improve scalability and enable the flexibility of being polyglot in the usage of technologies. Mostly this architecture is then complemented by a feature-rich and powerful browser application that sits on top of these backend services. Unfortunately, the latter step ends up way too often in the creation of a single, sprawling, and hard-to-maintain frontend monolith. This gap, between well-desinged backend systems and simplistic frontends is probebly rooted in the assumption that presentation logic is significanltmy simpler then domain logic. However, today's relaty implis diffrently. Modern UIs are not just forms and buttons, but ruther game-like applications that are built to deliver a significant added value to users, such that cannot be supported by backend systems and is not part of the core bussiness logic. This added value is then translated into complex presentation logic that should be tackaled properly in order to sustian scalability. In fact, it can be showen that the level of added value that the UI delivers is proportional to the complexity that has to be handled. 

As an example, consider a system that supports a query language, which allowes users to retrive complex sets of data. A possible UI for such system can be a form where users insert raw query strings, press the send button which invokes a server call. Such approch delivers no significant added-value to users, and thus does not introduces any special complexity. Another possible approch would be to offer the user an interactive query builder, which allows users to select values from pre-defined lists. This approch delivers some added value, and thus holds some complexity. A third option would be to offer a graphical drag&drop query builder, where users can drop entities onto a canvas, connect dropped entities with different kind of connections, recive hints and guidness when hovering with an entity over a canvas, and more. Here, a significant added value is introduced, and so does the presentation complexity: New concepts and entities emarges, such as canvs, vertexes and edges, which were not part of the bussiness logic, and has no representation in backend. This collection of entities and the synamics between them can be treated as an entire new Domain - a presentation domain. 






