---
public: false
type: article
title: "On Framework-Agnostic Frontends"
date: "2020-09-28T22:40:32.169Z"
description: 
---

In recent times, UI libraries and frameworks such as React, Vue, Angular and others have allowed us to build responsive UIs in an effieicnt manner. However, they have also lead to numeruis deeper problems, such as shifting the focuse away from presentation logic into components, and made a lot of people thing, together with the agile mindeset, that architecture and software desing are either unessesary or alrady given by the framework. However, as said by Douglas Martin, "design is inevitable. The alternative to good design is bad design, not no design at all". Component-driven development is too general to be considered as a design pattern.

A major side-effect of the relayens on UI frameworks is frontends which are a tangaled mixture of presentation logic, ocesunal bussiness-logic and infrastructure details. As logic is spread across different componentnts, it becomes difficult to distingwish bussiness and presentation logic from UI-concerns. This brings in two direct problems. 

- Limited Testability: Testing UI components is difficult, especially when components grow, becomes more complex and have multiply logical responsibilities. They are often enganded in state managment and asynchronius side-effects, which makes it even more difficult. 

- Lmited Reusability: Another direct problem is reusability. As organizations grow, they are requiered to support multiply platfroms and move between frameworks.

- Limited Teams Autonomy: A deep dependency in framework and other infrastructure also brings in limited ability to share codebase. Sharing the codebase is often derived from the structrue of the app itself, which is component-driven. This leds to arbitrary devision of responsibility between teams, such as teams owning certin views, pages or components.

- Not Domain-driven: As presentation logic is often heavily tangeled with framework and other infrastructure concerns, it is often not expressed in terms of the Domain, but ruther by syntetic terms and made-up concepts that are invenetd by developers. Such codebases are limited in thier reabiloty and  maintainability, as these concepts requier heavy documentation. A deeper issue is the overhead requiereed to translate user stories, which are expressed in terms of the bussiness, into technical tasks. 


#### Thinking in Layers

The first two problems are a direct result of frontends that are tangeled with framework - by seperating bussiness and presentation logic from UI components, one could express this logic in a purer forms, which would result easy testing and hgihly reusable logic. Such segregation can have far-reaching implications on the system design. For instance, the logical layer could be modedled from a domain-driven prespective, allowing a better aligment with bussiness concenrns, and resulting in highly readable code that captures the natural entities and processes that occure in the Domain. 

This segrigation can occure 





In software design, there are different approches for segregating logic from implementation details. One well-known architectural pattern is the Clean architecture that was suggested by Robert C. Martin. It combines the principles of the hexagonal architecture, the onion architecture and several other variants. Althogh the clean architecture was originaly suggested in connection with desingenin Backend systems, I will temp to apply a varioation of this architecture for desinging Frontend. 


Luckely, leading UI frameworks have relized that component-driven design is limited, and that there is a need for a way to write statefull logic outside of components's context. This has lead to the introduction of meaningfull features such as React Custom Hooks (in React) or Composition API (in Vue). 