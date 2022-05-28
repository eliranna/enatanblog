---
public: true
type: article
title: "Event-Sourcing as a DDD Pattern"
date: "2020-09-28T22:40:32.169Z"
description: About Event-Sourcing as a means to enhance Domain-driven Design and the CQRS architectural pattern that enables this concept.
---

<i>
A fundamental problem with building complex enterprise software is the knowledge gap created between domain experts and developers. As developers usually do not understand the core business concepts, they tend to create their own private language in order to describe business processes, which often results in software models that do not accurately reflect the business model. This is where Domain-driven design (DDD) comes into play, as it enforces a stricter alignment with the domain model. Domain-driven design is closely related to Event Sourcing and CQRS patterns. In this post, we will show how to combine Event Sourcing with CQRS to apply Domain-driven design principles.</i>

#### CRUD is not the answer

It all starts with one of the most fundamental decisions in software design: <mark>How should we represent the state of the system?</mark>
Going by the traditional create, read, update, and delete (CRUD) pattern, the answer is rather simple: the state of the system is reflected by a data-store. Once a new change occurs, the data is modified accordingly.

Despite its simplicity, the CRUD approach has some major drawbacks. First and foremost, CRUD systems perform update operations directly against a data-store, resulting in low performance, limited responsiveness, and limited scalability due to the processing overhead required to manipulate the data-store. Furthermore, when different clients write to the same item of data at the same time, there is a high risk of data conflicts, since update operations are slow and clients usually run in parallel.

Another fundamental problem with CRUD is the lack of an audit log. Persisting the current state might be useful for some cases, but it won’t bring much happiness to our data-analysts friends, simply because the platform doesn’t reveal any information about the system’s behavior over time. Any query that refers to the historical behavior of the system will remain unanswered. Those kinds of queries have superior importance in many fields, especially when it is needed to capture intent, purpose, or reason in the users' behavior. As an example, consider a Cybersecurity system, which receives ongoing reports from remote mobile-devices about incoming and outgoing calls, and is being used by data analysts to identify suspicious communication patterns. Another real-world example is a personal assistance app, such as Siri or Google Home, that receives messages from various home devices, and then run machine-learning algorithms to capture users’ preferences.

In an effort to solve the audit log problem, we might be tempted to persist all incoming messages and to use it as an audit log. This approach results in data duplication and contradicts the single source of truth principle. In the case of a conflict between the persisted data and the audit log, there will be no way to determine the state of the system.

Going back to Domain-driven design, the CRUD solution is even more problematic for domain experts, since stored data has no domain meaning. Tables are artificial constructs that represent the current state of the system, not the events that occurred. The Object-relational impedance mismatch can make complex database tables hard to understand and often requires additional processing. <mark>CRUD makes it hard to follow Domain-driven design principles since the domain language is being restricted to just four verbs (create, read, update, delete), which can hardly express any complex domain.</mark>

#### Enters Event Sourcing

The above issues are a result of storing computed values instead of storing facts about what actually happened. Those problems could be avoided by simply storing the events themselves, rather than storing the computed state. In fact, the state of the system as a whole, at any point in time, can be derived solely from the chain of events that have occurred until that point of time. Meaning that it is sufficient to only accumulate the events without having to store any additional data.

The idea of only storing the chain of events is known as Event Sourcing. With event sourcing, the event queue is the single source of truth of the system, and the state of the system at any point in time can be computed by replaying the events, one-by-one, by their order of arrival, starting from an initial state of the system.

<mark>Event Sourcing is similar to the way your bank manages your account.</mark> The bank does not save the current balance. Instead, it records the deposits and withdrawals that occur over time. The current balance can then be calculated at any time by simply replaying the deposits and withdrawals from the initial value. Event Sourcing is a generalization of this idea to any other domain — Any process can be mapped by storing an ordered list of domain-related facts (aka “events”).
Event Sourcing is a highly efficient write model. Events describe what has already happened, and because we cannot change the past, they are immutable. Events cannot be removed or be changed once they are stored. They can only be appended to the queue of events, which is an efficient operation that requires only minimal locking.

With Event Sourcing, events are modeled as first-class objects, rather than through implicit state changes, which makes the models closely resemble the actual processes they represent. Unlike tables of data, events typically have meaning for domain experts, which makes Event Sourcing a natural fit for Domain-driven design.

> “Event Sourcing focuses on professionalism and semantics, while CRUD focuses on technology.” — Steve Yegge

Event Sourcing has many other benefits, but it also brings in major difficulty. Although we have earned efficient write operations, Domain-driven architecture, and time-traveling capabilities, we have lost the efficiency of the read operations. Since the application state is now encoded as a series of events, there is no easy way to access it. Replaying the events each time we need to retrieve the application state is not a scalable solution, as the number of events can dramatically grow over time.

#### The CQRS solution

##### Divide and Rule

Fortunately, we are not restricted to using the same model for reading and writing data. By splitting the application into dedicated read and write models, we move the responsibility into dedicated objects. The write model does not need to be concerned with returning data and the read model can be specifically implemented to return the required data in a scalable manner. Having the write model separated from the read model enables the use of the most appropriate strategy for each model and allows both the write and read models to be scalable independently.

This architectural pattern, of separating reading and writing into two different models, is known as <mark>Command Query Responsibility Segregation (CQRS)</mark>. Its name is derived from the fact that every method should either be a command that performs an action or a query that returns data. A Command cannot return data and a Query cannot change the data.

It is worth mentioning that CQRS holds an additional benefit. Since CQRS is not focused around CRUD it allows us to write a task-based UI that cuts across the application to offer a rich, intention-based interface. This is yet another milestone toward Domain-driven development.

##### The best of both worlds

<mark>The CQRS pattern combines very well with Event Sourcing to achieve a scalable write model without having to compromise on reading performance.</mark> On the one hand, Event Sourcing is a particularly efficient write model since it works as an append log. On the other hand, since the read model is completely independent, we now have the freedom of choosing the most adequate technology to optimize for queries. This can even be a completely different technology from the write side, for example, a non-relational denormalized data-store built for fast text search. Although CQRS does not enforce splitting the data-store itself, using two different data-stores gives us the freedom of implementing a read data-store as denormalized data, allowing performant querying and higher scalability. It’s also a chance to store data which makes more sense as to how it should be displayed by the client.

Furthermore, by applying a micro-service architecture, we can now create multiply read models, each adapted to serve a specific type of customer. While one read model supports fast text search (Like using Elasticsearch for searching an IoT device by its name), another read model supports querying using a graph language (Like using Amazon Neptun to find all IoT devices which are connected to a certain device), and a third read model uses a real-time database (like using Google Cloud Firestore to send realtime updates to a Web app).

##### Keeping them in sync

As we split not only the read and the write models but also the data-stores they used, we get the benefits of fast read and write operation, as the two models are now decoupled and independent. A new problem arises: We need to keep the data-stores in sync. More specifically to the case of Event Sourcing — we need to make sure that once a new event has been added to the events-store (aka the write model), the change in state is reflected in the denormalized data-store (aka the read model). This is extremely important, as we want the read side to accurately reflect the continuous inputs of the write side.

A common solution is to use a special event-store that functions as an events bus. Not only does the event store acts as a database of events, but it also behaves as a message broker. It provides an API that enables services to subscribe to events. Each event that is persisted in the event store is delivered to all interested subscribers. The event store is the backbone of an event-driven microservices architecture.

#### Considerations

By combining the Event Sourcing pattern with the CQRS pattern, and by splitting the data-store into two data-stores, one for reading and the other for write, we get the benefits of Event Sourcing without having to compromise on the read-model performances. Nevertheless, there are major factors to consider.

##### Eventual consistency
The issue of consistency might become painful if not considered well. Since the data-store is separated into two different data-stores, and since the read model is denormalized, it might take a considerable amount of time for syncing the read model with the corresponding data in the write model. During that timeframe, the read model will be reflecting stale information. Consider the previous example, with a focus on the first microservice described in step (4): It might take a considerable amount of time to process the device’s connection request and to convert it to a node in the graph data-store. During this timeframe, any query result on that data-store will not contain the newly added device, right until the data-store is fully updated.

This consistency model is knowen as <mark>Eventual consistency</mark>. An eventual consistent system is any distributed system that eventually converges on a state if no more updates are done to a given entity. While the system settles on value, it can return stale or inconsistent data, a period that is known as the inconsistency window.

The issue of Eventual consistency in distributed systems is a problem we cannot solve unless we compromise on the system availability. This is directly implied from the <mark>CAP theory</mark>. Thus, when designing a distributed system, it is essential to properly distinguish between functionalities which are allowed to be eventually consistent, to those who must be strongly consistent, even at the expense of their availability.

However, there are different ways in which we can mask issues resulting from Eventual consistency. Front-ends can “Fake” strong-consistency by doing Optimistic Concurrency: it can embed some knowledge and suppose the mutation it asked for will be accepted, so it displays the estimated result before getting the “real result”. In case of discrepancies, it adapts. This is beneficial in cases where commands are likely to succeed, and when the outcome is not critically important.

##### CQRS User flows
With CQRS, the read and write models are completely decoupled, meaning that commands will never return a value. For some user flows, this limitation might be problematic. Let’s consider the implementation of the device connection flow from a UI point of view. We allow users to connect a device to their IoT network via a reactive web application. Once the user hits the connection button, we dispatch a `deviceConnectionRequest` command to the server, expecting a deviceId to be returned as a response. Using the deviceId, we can now route the user to the newly added device's settings page. However, with CQRS, this type of flow will not be possible. The `deviceConnectionRequestCommand`, just like any other CQRS command, will not return any value. Instead, we would just have to wait for the read model to announce a new connected device, or to explicitly query for new connected devices, but those solutions would significantly harm the user experience. A reasonable walkaround would be not to use CQRS for implementing this specific microservice. It is completely reasonable not to use CQRS for every feature of your app.

##### Snapshots
From time to time, we will have to rebuild the read model from scratch. It might be due to inconsistency or a reboot of the system. In the case of Event-sourcing, this is easy — we just have to replay all events. In the case of the IoT platform, the number of events might be huge, so rebuilding the read model by replaying all events might be a costly operation. If the streams are large, we can create snapshots at specific intervals, such as a specified number of events. The current state of the entity can be obtained from the snapshot and by replaying any events that occurred after that point in time.

##### Event granularity
This is one of the most important design decisions and one of the hardest. Too fine-grained events won’t have enough information to be useful. Too coarse events will have a high impact on performance due to serialization and deserialization, on disk space, and stress the messaging system. Also, they most likely won’t mean anything and won’t have any domain value at all. One approach is to distinguish carefully between domain-events and events which are not domain related:

> “Event Sourcing and domain events can of course be used both at the same time, but should not influence each other. The two concepts are used for different purposes and should therefore not be mixed.” — Christian Stettler

<div class="seperator">...</div>

We have described how Event Sourcing can be a better architectural choice then CRUD, especially when it is necessary to capture intent, purpose, or reason. We have also shown that by integrating the CQRS pattern with Event Sourcing, we can achieve a performant read model, as this pattern allows us to separate the Read Model from the Write Model, making them independently scalable.