---
public: false
type: article
title: "Sharing State Between Micro-Frontends"
date: "2020-09-28T22:40:32.169Z"
description: 
---

<div class="preface">
Micro frontends architecture is extremely powerful when it comes to splitting large frontend monoliths into smaller, individually deployable blocks, each is owned by an autonomous team and is focused on a business domain. But what about State? We are often told that micro frontends shouldn't share state, as this would make them coupled to each other. However, when it comes to complex UIs, it is not rare to encounter scenarios where state management between micro frontends is necessary. This post is about finding the sweet spot — In which scenarios it is reasonable for micro frontends to share State? and how should micro frontends share State while remaining decoupled from each other? We discuss and compare different solutions, as we reveal a link to Domain-driven Design.
</div>

One of the main motivation for Microfrontends architecture is the relative independency of each Microfrontend. This independency can drasticlly simplify the design and implementation of each block, and dramaticly increase the autonomy of each team. However, not any decomposition of a Frontend monolith into Microfrontends would be nessesaraly effective in terms of delivering autonomy. 

This brings us into a more general discussion that is not limited to Frontend: How, then, should a monolith software  be decomposed into multiply units in a way that maximizes the level of relative autonomusy of teams? 

In general, to maximize autonomiusy of teams, we would need that each team would owned a portion of the software, and these softwares have as little as possible touch points. This can be defined more precisly. In Agile, A User Story is a short description that describes a goal that the user would like to achive. This description is from the user prespective and is expressed in terms of the bussiness. 

What we want: Given a User Story, all the parts in the system that are effected by solving this story would belong to the responsibility area of a single team. This way, the owning team could implement the feature end-to-end, with little to no communicaiton with other teams, improving agility, developer experience and teams autonomy. Since User Stories express a goal that belongs to some bussiness aspect, then it makes sense to determine responsibiloty areas according to bussiness aspects. Hence, orgenizing our teams in a way that each team ownes the entire software that supports a certin bussiness aspect would deliver better team autonomy. 

A question that pops up is: How can we be sure that assinging each team with a bussiness aspect would result in such software that preserves the seperation between teams? What ensures us that, with time, team's software wont become tangaled with each other in a way that would break the dichotomy that we were aiming for? 

The answare to this queston is rooted in what is known as Conways law. Conways law states that organizations will always tend to mirror thier own structure in the software they built. In accordinace, the Inverse Conway maneuver recommends evolving team and organizational structure to promote the desired architecture. Hence, if we assume that our organizaiton and software are bounded to Conways law, then we can assume that by orgenizing teams in aligment with bussiness concerns, the resulted sofwtare will be aligned with bussiness concerns as well, and thus, the dichotomy between responsiblity areas of different teams will be preserved. 

Going back to microfrontends, the above realization implies that assinging teams with microfrontends, where each team handle a certin concern of the bussiness would make the most sustanable approch in terms of teams autonomy. This brings up the question of how can we ensure a correct identifion and distingwishion between diffrent bussiness concerns? A wrong modeling could result in teams owning overlapping bussiness responsibility areas, which, in turn would result in software that is not well divideable due to Conways law. This is where Domain-driven Desing (DDD) can being applyed.

#### Enters Strategic DDD

Strategic Domain-driven Design (Strategic DDD) is a collection of metodologies for the decomposition of a bussiness domain into multiply subdomains, where each subdomain correspondes to a main bussiness concern, and for matching each such subdomain with the area of the application that implements that subdomain. The process begins with domain experts identifing the different subdomains which composes the bussiness domain. Once such decomposition has been obtained, domain experets model each subdomain by composing an unambigius languge which aims to captures the natural entities and processes that occure within and from the prespective of that subdomain. This modeling and its resulted software is defined as a <i>Bounded Context</i>. 

For example, consider a standart e-commerce application which allows users to browese and search products, dropping these products into a cart, schedulae a delivery, track and manage the delivery, get online support and edit thier profil. This applciation domain can be decomposed into the following subdomains: 
- Catalog: For browsing and finding products.
- Delivery: For selecting products, scheduling delivery and making payments. 
- Shipping: For tracking down, editing or canceling on-going deliveris. 
- Support: 

Different bounded contexts can be evolved and implemented independently. That said, bounded contexts are not independent. A system cannot be built out of independent components; the components have to interact with one another to achieve the overarching system goals. The same goes for bounded contexts. Although their implementations can evolve independently, they have to integrate with each other. As a result, there will always be touchpoints between bounded contexts. The process of identifing the relationships between different contexts and defining thier interface is known as <i>Context Mapping</i>. 

Going back again to Microfrontends, by appling strategic DDD on the bussiness domain, it is possible to identify each microfrontend as (the implemeentation of) a bounded context. This implis that the exschange of information between different microfrontends, that is, thier common state, is derived from the relatioships between the respective bounded contexts. 