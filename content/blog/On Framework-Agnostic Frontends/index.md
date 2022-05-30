---
public: false
type: article
title: "On Framework-Agnostic Frontends"
date: "2022-05-28T22:40:32.169Z"
description: Applying a multitier architectural approach to design highly scalable frontend applications.  
---

We have seen significant benefits in software architectures that highlight the importance of segregating core logic from infrastructure concerns, especially since it enhances testability, reusability, and general scalability. This is mostly achieved by applying Multitier architectures, such as the Haxagonail architectural pattern, or the Clean architecture, to build scalable backend systems. 

Unlike with the backend, this sort of architectural approach is not very common in frontend development, mainly due to the assumption that presentation logic, which is handled by the frontend, is fundamentally simpler than business logic, which is handled by the backend. This assumption might have been true 10 years ago, but today's reality is different. UI's are no longer just forms and buttons but are applications that provide a game-like experience, as they aim to deliver significant add-value to users, such that cannot be provided by the backend alone and is not derived or expressed by business logic.

#### Thinking in Layers
Multitier architecture can be applied on Frontend. At its center layes the core layer, which holds the presentation logic at it purest form. Any infrastructure, whether it is a UI or data souce, could be plugged in and out the core. To ensure a full encapsulation of the core app, an adapters (plugins) layer is requiered. An importent property of this design is that dependencies always points inwards, which means that the an inner layer is never dependent or aware of any outher layer. Another segnificant benifits is that since the core app is purly logical, presentation logic can be modeled in a way that would capture the natural entities and processes that composes the UI. This can be achived by appling tctical Domain-driven Design patterns in modeling the core app. 

<div class="article-image">
    <img src="https://i.ibb.co/mbQD21D/Screen-Shot-2022-05-27-at-11-38-23.png">
</div>

#### The MVVM Pattern
An example for a pattern that matches a layered-architecture style is Model–view–viewmodel (MVVM). The MVVM pattern defines three core components: the model, the view, and the view model. While the view is responsible for defining the structure, layout, and appearance of what the user sees on screen, the view model implements properties and commands to which the view can data bind to, and notifies the view of any state changes through change notification events. The properties and commands that the view model provides define the functionality to be offered by the UI, but the view determines how that functionality is to be displayed. The view model is also responsible for coordinating the view's interactions with any model classes that are required. There's typically a one-to-many relationship between the view model and the model classes.

From a layered architecutre prespective, the view model acts as an adapter between the view, which belongs to the infrastructure layer, and the model, which belongs to the core layer. 

<div class="article-image">
    <img src="https://i.ibb.co/vkqXxpY/Screen-Shot-2022-05-27-at-12-03-10.png">
</div>

Following the last years, leading UI frameworks have made significant progress in supporting the construction of Framework-agnostic Frontends. This is mostly highlighetd by React Custom Hooks and by Vue's Composition API, as both allowes to write statefull logic outside of the context of components. 

##### Example: React Custom Hooks
With React, a view model can be implemnetd as a Custom React Hook. 

```ts
import useCartViewModel from '../view-models/cart'

function Cart() {

    const {
        products, 
        removeProduct,
        addProduct
    } = useCartViewModel();

    return (
        <ProductsList
            products={products}
            onRemove={removeProduct}
            onDrop={addProduct}>
        </ProductsList>                   
    );
  }
  
export default Cart;
```

A Custom Hook would use lower-level hooks to maintain state and response to changes. 

```ts
export default function useCartViewModel() {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=> {
        setProducts(getCartProductsUseCase.handle())
    })

    return {
        products
    }

}
```

As can be seen in the above example, view models interact with the `Model` via <mark>usecases</mark>. By encapsulting the core layer with usecases interface, any code that is external to the core layer can only interact with it via usecases. 
it is reccommended that all view models could only access the `Model` throgh a set of fuctions which explicidly reflects the `Model` exposed functionality. This set of functions is commonly known as <mark>usecases</mark>.

#### Usecases
A use case represents a potential request that the core application is expected to handle, wheather its a query or a command. Each such use case is represented by an associated usecase function. It is important that usecase functions are pure, that is, deterministic, never produce side-effects, and never directly interact with code that is external to the core layer. The collection of usecase functions composes the interface of the core layer, and should stricktly be the only communication channel with the core layer. In DDD terminology, usecases are reffered to as services. 

```ts

export class AddProductToCartUseCase {

    handle(productId: ProductId) {

        // Retrive core entities
        const product: Product = this.productRepository.get(productId)
        const cart: Cart = this.cartRepository.get()

        // Interact between core entities
        cart.addProduct(product)

        // Persist changes
        this.cartRepository.save(cart) 
    }

}

```

The above implementation of a usecase follows a retrive-interact-persist life-cycle. At the retrive step, core entities are retrived from data-sources, mainly throgh the utilization of repositories. 





#### The Repository Pattern
Similaraly to UI's, data-sources are another infrastructure concern that should be pluggble in and out the core application. A pattern that matches the layered-architecture approch and is sutable for handling data-sources is the Repository Pattern. Repositories are classes that encapsulate the logic required to access data sources. They centralize common data access functionality, providing better maintainability and decoupling the infrastructure or technology used to access datasources from the core layer.

From a layered architecutre prespective, the repository acts as an adapter between the data source, which belongs to the infrastructure layer, and the repository interface, which belongs to the core layer. To plug a data-source, one must write a matching repository that implements the repository interface that is defined in the core app, ensuring that the core layer is completly isolated from infrastructural concerns. 

<div class="article-image">
    <img src="https://i.ibb.co/sWtcHv0/Screen-Shot-2022-05-27-at-15-55-06.png">
</div>

When applying the repository pattern, it is importent to notice the inversion of control. The modal uses the Repository for the purpose of setting and retriving data, but importing the repository directly in the model would make the core layer dependent on a component from the adapter layer, which would breake the rule of inwards-pointing dependencies. This can be resolved by applying an inversion of control, usually done by dependency injection. 

##### Example using React Context
Another React feature that is effective for implementing the repository pattern is React Context. Repositories implementations can be imported into a React Context. Then, these repositories become avaliable to any UI component that is within this context. These components can then inject the requieeed repository implementation by passing it down to a the model 

```jsx
import {CartProvider} from './contexts/cart-context'
import {Cart} from './components/cart'

function App() {
    return (
        <CartProvider>
            <Cart></Cart>
        </CartProvider>
    )
}
```

The `CartContext` provides access to the cart repository. 

Wrapped by a `CartProvider`, the `Cart` component can now retrive the context from anywhere within its scope, and use it when initilizing the view model:  

```jsx
import useCartViewModel from './view-models/cart'
import {CartContext} from './contexts/cart-context'

const {

    products, 
    removeProduct,
    addProduct

} = useCartViewModel(useContext(CartContext));
```

Now, the view model is injected with `CartContext`, it can further inject it into the core application via usecases instansiation: 

```js
export default function useCartViewModel(CartRepository: ICartRepository) {

    const addProductToCartUseCase = new AddProductToCartUseCase(CartRepository)
    
    // Here: Implement the View Model

}
```

The `ICartRepository` type is defined as part of the core layer, and is utlizied directly by usecases, regardless of the actual implementation of the repository. 

```js
export class ProductsRepository implements ICartRepository {
    /*
        Here: Implement the repository as a translation layer 
        between the data-source API and the ICartRepository interface.
    */ 
}
```

To match this design, usecases should be desinged as a class that is initiated with a repository implementation, and exposes an execution mathod: 

```js
export class AddProductToCartUseCase {

    private cartRepository: ICartRepository;

    constructor(cartRepository: ICartRepository) {
        this.cartRepository = cartRepository;
    }

    handle(productId: ProductId) {
        // Here: Implement the use case
    }
```

In the above snippt, `handle()` acts as the execution mathod of the `AddProductToCartUseCase` usecase. This allows the usecase to have direct access to the injected repository. 

#### Framework-Agnostic Design

<div class="article-image">
    <img src="https://i.ibb.co/k6KHD4H/Screen-Shot-2022-05-28-at-23-47-16.png">
</div>




<div class="seperator">...</div>

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