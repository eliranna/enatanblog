---
public: false
type: article
title: "Micro-Frontends Communication Patterns"
date: "2022-05-09T22:40:32.169Z"
description: 
---

#### Communication solutions

Following the similarities between Microfrontends and Microservices architecture, we can also derive ways for Microfrontends to communicate based on common approches in Microservices architecture. 



any message published to a topic is immediately received by all of the subscribers to the topic

##### Pub/Sub Asynchronius messageing
One common approch that allows a communication between isolated systems is the Publish/Subscribe (pub/sub) Asynchronius messageing mechanisem. In a pub/sub model, each isolated system publishes domain events to a messages bus which any other system can listen to. Each system can choose to subscribe to a certin topic, and thus recive only the messages that are requiered for its operation. In browser enviorment, such mechanisem can be implemented on the basis of custom events. 

A notiable benifit of this approch is that its technology Annostic. By relaying on the global window object and on native JavaScript events, it enables the communication between diffrent microfrontends that are implemeted with different technological stacks. 

##### Runtime Integration
Module Federation is a Webpack5 feature that allows a runtime composition of multiply builds into a single application. This can be used to combine multiply independent microfrontends to form a single frontend, and to allow a loosly-coupled communication channels between them. This communication is enabled via a globaly-defined contract, namly, the `entries` input and an `exposes` output. For each Microfrontend, the `entries` input define what the micro frontend app wants to use from other micro frontend apps, whearas the `exposes` output defins what the micro frontend app exposes to other apps. With this mechanisem, Microfrontends are not limited to just exposing the whole micro frontend app itself, it can also be just parts of it like functions, components, full-page-contents, routing, etc, as long as it is compilable to JavaScript.  


##### State on Backend


##### A Global Store





##### The role of Design Systems