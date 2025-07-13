# Chapter 6: Designing with Objects

When you use a software product, you expect it to behave as advertised. Unfortunately, not all products live up to expectations. The problem is that when many products are pro- duced, the majority of time and effort go into the engineering phase and not into the de- sign phase.

Object-oriented (OO) design has been touted as a robust and flexible software devel- opment approach.The truth is that you can create both good and bad OO designs just as easily as you can create both good and bad non-OO designs. Don't be lulled into a false sense of security just because you are using a state-of-the-art design tool.You have to pay attention to the overall design and invest the proper amount of time and effort to create the best possible product.

In Chapter 5, “Class Design Guidelines,” we concentrated on designing good classes. This chapter focuses on designing good systems. (A system can be defined as classes that interact with each other.) Proper design practices have evolved throughout the history of software development, and there is no reason you should not take advantage of the blood, sweat, and tears of your software predecessors, whether they used OO technolo- gies or not.

## Design Guidelines

One fallacy is that there is one true design methodology. This is not the case. There is no right or wrong way to create a design. There are many design methodologies available to- day, and they all have their proponents. However, the primary issue is not which design method to use, but simply whether to use a method at all. This can be expanded to the entire software development process. Many organizations do not follow a standard soft- ware development process. The most important factor in creating a good design is to find a process that you and your organization can feel comfortable with. It makes no sense to implement a design process that no one will follow.

Most books that deal with object-oriented technologies offer very similar strategies for designing systems. In fact, except for some of the object-oriented specific issues involved, much of the strategy is applicable to non–OO systems as well.

Generally, a solid OO design process will generally include the following steps:
1. Doing the proper analysis
2. Developing a statement of work that describes the system
3. Gathering the requirements from this statement of work
4. Developing a prototype for the user interface
5. Identifying the classes
6. Determining the responsibilities of each class
7. Determining how the various classes interact with each other
8. Creating a high-level model that describes the system to be built

In this chapter, we are most interested in the last item on this list. The system, or object model, is made up of class diagrams and class interactions. This model should represent the system faithfully and be easy to understand and modify. We also need a notation for the model. This is where the Unified Modeling Language (UML) comes in. As you know, UML is not a design process, but a modeling tool.

**The Ongoing Design Process**
Despite the best intentions and planning, in all but the most trivial cases, the design is an ongoing process. Even after a product is in testing, design changes will pop up. It is up to the project manager to draw the line that says when to stop changing a product and adding features.

It is important to understand that many design methodologies are available. One early methodology, called the waterfall model, advocates strict boundaries between the various phases. In this case, the design phase is completed before the implementation phase, which is completed before the testing phase, and so on. In practice, the waterfall model has been found to be unrealistic. Currently there are other design models, such as rapid prototyp- ing, that promote a true iterative process. In these models, some implementation is at- tempted prior to completing the design phase as a type of proof-of-concept. Despite the recent aversion to the waterfall model, the goal behind the model is understandable. Com- ing up with a complete and thorough design before starting to code is a sound practice. You do not want to be in the release phase of the product and then decide to iterate through the design phase again. Iterating across phase boundaries is unavoidable; however, you should keep these iterations to a minimum (see Figure 6.1).

Simply put, the reasons to identify requirements early and keep design changes to a minimum are as follows:
- The cost of a requirement/design change in the design phase is relatively small.
- The cost of a design change in the implementation phase is significantly higher.
- The cost of a design change after the deployment phase is astronomical when com- pared to the first item.

Similarly, you would not want to start the construction of your dream house before the architectural design was complete. If I said that the Golden Gate Bridge or the Empire State Building was constructed without any consideration of design issues, you would consider the statement absolutely crazy. Yet, you would most likely not find it crazy if I told you that the software you were using might contain some design flaws, and in fact, might not have been thoroughly tested.

In any case, it might be impossible to thoroughly test software, in the sense that ab- solutely no bugs exist. But that does not mean that we shouldn't try to weed out as many bugs as possible. Bridges and software might not be directly comparable; however, software must strive for the same level of engineering excellence as the “harder” engineering disci- plines such as bridge building. Poor-quality software can be lethal—it's not just wrong numbers on payroll checks. For example, inferior software in medical equipment can kill and maim people.

**Safety Versus Economics**
Would you want to cross a bridge that has not been inspected and tested? Unfortunately, with many software packages, users are left with the responsibility of doing much of the test- ing. This is very costly for both the users and the software providers. Unfortunately, short- term economics often seem to be the primary factor in making project decisions.

Because customers seem to be willing to pay the price and put up with software of poor quality, some software providers find that it is cheaper in the long run to let the customers test the product rather than do it themselves. In the short term this might be true, but in the long run it costs far more than the software provider realizes. Ultimately, the software provider's reputation will be damaged.

Some computer software companies are willing to use the beta test phase to let the customers do testing—testing that should, theoretically, have been done before the beta version ever reached the customer. Many customers are willing to take the risk of using pre-release software simply because they are anxious to get the functionality the product promises.

After the software is released, problems that have not been caught and fixed prior to re- lease become much more expensive. To illustrate, consider the dilemma automobile com- panies face when they are confronted with a recall. If a defect in the automobile is identified and fixed before it is shipped (ideally before it is manufactured), it is much cheaper than if all delivered automobiles have to be recalled and fixed one at a time. Not only is this scenario very expensive, but it damages the reputation of the company. In an increasingly competitive market, high-quality software, support services, and reputation are the competitive advantage (see Figure 6.2).

**Software Engineering**
Although it might be acceptable to compare automobiles, bridges, and software when dis- cussing quality, the legal implications of these topics cannot be compared, at least not yet. The legal issues regarding software are currently being defined and revised. Currently dis- claimers such as “we are not responsible for anything that this software does or causes to happen" abound. Some other industries do not have this luxury. As the software legal process evolves and matures, software manufacturers may well have to contend with these issues. (As a standard disclaimer, in no way does this book attempt to offer any legal ad- vice.)

## Performing the Proper Analysis

There are a lot of variables involved in building a design and producing a software prod- uct. The users must work hand-in-hand with the developers at all stages. In the analysis phase, the users and the developers must do the proper research and analysis to determine the statement of work, the requirements of the project, and whether to actually do the project. The last point might seem a bit surprising, but it is important. During the analysis phase, there must not be any hesitation to terminate the project if there is a valid reason to do so. Too many times pet project status or some political inertia keeps a project going, re- gardless of the obvious warning signs that cry out for project cancellation. Assuming that the project is viable, the primary focus of the analysis phase is for everyone to learn the systems (both the old and the proposed new one) and determine the system requirements.

**Generic Software Principles**
Most of these practices are not specific to OO. They apply to software development in general.

## Developing a Statement of Work

The statement of work (SOW) is a document that describes the system. Although determin- ing the requirements is the ultimate goal of the analysis phase, at this point the require- ments are not yet in a final format.The SOW should give anyone who reads it a complete understanding of the system. Regardless of how it is written, the SOW must represent the complete system and be clear about how the system will look and feel.

The SOW contains everything that must be known about the system. Many customers create a request-for proposal (RFP) for distribution, which is similar to the statement of work. A customer creates an RFP that completely describes the system they want built and releases it to multiple vendors.The vendors then use this document, along with what- ever analysis they need to do, to determine whether they should bid on the project, and if so, what price to charge.

## Gathering the Requirements

The requirements document describes what the users want the system to do. Even though the level of detail of the requirements document does not need to be of a highly technical nature, the requirements must be specific enough to represent the true nature of the user's needs for the end product.The requirements document must be of sufficient detail for the user to make educated judgments about the completeness of the system. It must also be of specific detail for a design group to use the document to proceed with the design phase.

Whereas the SOW is a document written in paragraph (even narrative) form, the re- quirements are usually represented as a summary statement or presented as bulleted items. Each individual bulleted item represents one specific requirement of the system.The re- quirements are distilled from the statement of work. This process is shown later in the chapter.

In many ways, these requirements are the most important part of the system. The SOW might contain irrelevant material; however, the requirements are the final representation of the system that must be implemented. All future documents in the software development process will be based on the requirements.

## Developing a Prototype of the User Interface

One of the best ways to make sure users and developers understand the system is to create a prototype. A prototype can be just about anything; however, most people consider the prototype to be a simulated user interface. By creating actual screens and screen flows, it is easier for people to get an idea of what they will be working with and what the system will feel like. In any event, a prototype will almost certainly not contain all the functional- ity of the final system.

Most prototypes are created with an integrated development environment (IDE). How- ever, drawing the screens on a whiteboard or even on paper might be all that is needed. Traditionally, Visual Basic .NET is a good environment for prototyping, although other languages are now in play. Remember that you are not necessarily creating business logic (the logic/code behind the interface that actually does the work) when you build the pro- totype, although it is possible to do so. The look and feel of the user interface are the major concerns at this point. Having a good prototype can help immensely when identifying classes.

## Identifying the Classes

After the requirements are documented, the process of identifying classes can begin. From the requirements, one straightforward way of identifying classes is to highlight all the nouns. These tend to represent objects, such as people, places, and things. Don't be too fussy about getting all the classes right the first time.You might end up eliminating classes, adding classes, and changing classes at various stages throughout the design. It is important to get something down first. Take advantage of the fact that the design is an iterative process. As in other forms of brainstorming, get something down initially, with the under- standing that the final result might look nothing like the initial pass.

## Determining the Responsibilities of Each Class

You need to determine the responsibilities of each class you have identified. This includes the data that the class must store and what operations the class must perform. For exam- ple, an Employee object would be responsible for calculating payroll and transferring the money to the appropriate account. It might also be responsible for storing the various payroll rates and the account numbers of various banks.

## Determining How the Classes Collaborate with Each Other

Most classes do not exist in isolation. Although a class must fulfill certain responsibilities, many times it will have to interact with another class to get something it wants. This is where the messages between classes apply. One class can send a message to another class when it needs information from that class, or if it wants the other class to do something for it.

## Creating a Class Model to Describe the System

When all the classes are determined and the class responsibilities and collaborations are listed, a class model that represents the complete system can be constructed. The class model shows how the various classes interact within the system.

In this book, we are using UML to model the system. Several tools on the market use UML and provide a good environment for creating and maintaining UML class models. As we develop the example in the next section, we will see how the class diagrams fit into the big picture and how modeling large systems would be virtually impossible without some sort of good modeling notation and modeling tool.

## Case Study: A Blackjack Example

The rest of this chapter is dedicated to a case study pertaining to the design process cov- ered in the previous sections. Walking through a case study seems to be a standard exercise in many object-oriented books that deal with OO design.

My first recollection of such an exercise was a graduate course that I took in which we followed an example in the book Designing Object-Oriented Software by Wrifs-Brock, Wilk- erson, and Weiner. The modeling technique was called CRC modeling, which will be de- scribed later in this section. The case study was that of an automated teller machine (ATM) system. The iterative process of identifying the classes and responsibilities using CRC modeling was an eye-opening experience.The books, The Object Primer by Scott Ambler and Object-Oriented Design in Java by Gilbert and McCarty, both go through simi- lar exercises using CRC modeling and Use Cases. Let's start an example that we expand on throughout this chapter.

Because we want to have some fun, let's create a program that simulates a game of blackjack. We will assume that the statement of work has already been completed. In fact, let's say that a customer has come to you with a proposal that includes a very well-written SOW and a rulebook about how to play blackjack.

According to the statement of work, the basic goal is to design a software system that will simulate the game of blackjack (see Figure 6.3). Remember, we will not describe how to implement (code) this game—we are only going to design the system. Ultimately, this will culminate in the discovery of the classes, along with their responsibilities and collabo- rations. After some intense analysis, we have determined the requirements of the system. In this case, we will use a requirements summary statement; however, we could have pre- sented the requirements as bullets. Because this is a small system, a requirements summary statement might make more sense. However, in most large systems, a database of the re- quirements (in bulleted list format) would be more appropriate. Here is the requirements summary statement:

**Requirements Summary Statement**
The intended purpose of this software application is to implement a game of blackjack. In the game of blackjack, one or more individuals play against the dealer (or house). Although there might be more than one player, each player plays only against the dealer, and not any of the other players.

From a player's perspective, the goal of the game is to draw cards from the deck until the sum of the face value of all the cards equals 21 or as close to 21 as possible, without exceeding 21. If the sum of the face value of all the cards exceeds 21, the player loses. If the sum of the face value of the first two cards equals 21, the player is said to have blackjack. The dealer plays the game along with the players. The dealer must deal the cards, present a player with ad- ditional cards, show all or part of a hand, calculate the value of all or part of a hand, calculate the number of cards in a hand, determine the winner, and start a new hand.

A card must know what its face value is and be able to report this value. The suit of the card is of no importance (but it might be for another game in the future). All cards must be members of a deck of cards. This deck must have the functionality to deal the next card, as well as report how many cards remain in the deck.

During the game, a player can request that a card be dealt to his or her hand. The player must be able to display the hand, calculate the face value of the hand, and determine the number of cards in the hand. When the dealer asks the player whether to deal another card or to start a new game, the player must respond.

Each card has its own face value (suit does not factor into the face value). Aces count as 1 or 11. Face cards (Jack, Queen, King) each count as 10. The rest of the cards represent their face values.

The rules of the game state that if the sum of the face value of the player's cards is closer to 21 than the sum of the face value of the dealer's cards, the player wins an amount equal to the bet that was made. If the player wins with a blackjack, the player wins 3:2 times the bet made (assuming that the dealer does not also have blackjack). If the sum of the face value of the player's cards exceeds 21, the bet is lost. Blackjack (an ace and a face card or a 10) beats other combinations of 21.

If the player and the dealer have identical scores and at least 17, it is considered a draw, and the player retains the bet.

As already mentioned, you could also have presented the requirements in bullet form, as we did for the DataBaseReader class in Chapter 2, “How to Think in Terms of Objects.” We want to take the perspective of the user. Because we are not interested in the im- plementation, we'll concentrate on the interface.Think back to the black-box example from Chapter 1,“Introduction to Object-Oriented Concepts.”We only care about what the system does, not how it does it.

The next step is to study the requirements summary statement and start identifying the classes. Before we actually start this process, let's define how we are going to model and track the classes that we ultimately identify.

### Using CRC Cards

Discovering classes is not a trivial process. In the blackjack example we are working on, there will be relatively few classes because this is intended as an example. However, in most business systems, there could be dozens of classes—perhaps 100 or more. There must be a way to keep track of the classes as well as their interactions. One of the most popular methods for identifying and categorizing classes is to use class-responsibility-collaboration cards (CRC). Each CRC card represents a single class's data attributes, responsibilities, and collaborations.

For me, one of the more endearing qualities of CRC cards is that they can be non- electronic (although there are computer applications around that model CRC cards). In their basic sense, CRC cards are, quite literally, a collection of standard index cards.

You need to create three sections on each card:
- The name of the class
- The responsibilities of the class
- The collaborations of the class

The use of CRC cards conjures up scenes of dimly lit rooms—partially filled boxes of pizza, pop cans, and multitudes of index cards strewn around the room. Although this might be partially true, using CRC cards is a good technique because many of the people involved with the design will not be developers. They might not even have much com- puter experience. Thus, using the index cards to discover classes (even a computerized CRC system) is a technique that everyone can understand.There are certainly various ways to perform these tasks, and many developers will use techniques that they are com- fortable with. Figure 6.4 shows the format of a CRC card.

### Identifying the Blackjack Classes

Remember that, in general, classes correspond to nouns, which are objects—people, places, and things. If you go through the requirements summary statement and highlight all the nouns, you have a good list from which you can start gleaning your objects.

**Nouns**
Although it is true that nouns generally indicate classes, nouns are not the only places where classes are found.

As stated earlier, you shouldn't get too hung up in getting things right the first time. Not all the classes that you identify from the list of nouns or elsewhere will make it through to the final cut. On the other hand, some classes that were not in your original list might ac- tually make the final cut. Start feeling comfortable with the iterative process throughout the design. And as always, make sure that you realize that there are always many ways to solve a problem. It is often said that if you put 10 people in different rooms, they will come up with 10 different designs, and they might all be equally good. In most cases, al- though the designs might be different, ideally there will be significant overlap. Of course, when working with a team, the final design will have to be a consensus, iterating and evolving to a common solution.

Let's identify some nouns from our blackjack example: If the player and the dealer have identical scores and at least 17, it is considered a draw, and the player retains the bet.

Now let's make a list of the possible objects (classes):
- Game
- Blackjack
- Dealer
- House
- Players
- Player
- Cards
- Card
- Deck
- Hand
- Face value
- Suit
- Winner
- Ace
- Face card
- King
- Queen
- Jack
- Game
- Bet

Can you find any other possible classes that were missed? There might well be some classes that you feel should be in the list but are not. There might also be classes that you feel should not have made the list. In any event, we now have a starting point, and we can begin the process of fine-tuning the list of classes.This is an iterative process, and although we have 19 potential classes, our final class list might be a lot shorter.

Again, remember that this is just the initial pass. You will want to iterate through this a number of times and make changes. You might even find that you left an important object out or that you need to split one object into two objects. Now let's explore each of the possible classes (as classes are eliminated, they will be crossed out with a strikethrough):
- Game-Blackjack is the name of the game. Thus, we treat this in the same way we treated the noun game.
- Blackjack—In this case, game might be considered a noun, but the game is ac- tually the system itself, so we will eliminate this as a potential class.
- Dealer-Because we cannot do without a dealer, we will keep this one (as a note, we could abstract out the stuff pertaining to people in general, but we won't in this example). It might also be possible to avoid a dealer class altogether, thus having the dealer simply be an instance of the player class. However, there are enough additional attributes of a dealer that we should probably keep this class.
- House This one is easy because it is just another name for the dealer, so we strike it.
- Players and player—We need players, so we have to have this class. However, we want the class to represent a single player and not a group of players, so we strike player and keep player.
- Cards and card—This one follows the same logic as player. We absolutely need cards in the game, but we want the class to represent a single card, so we strike cards and keep card.
- Deck-Because there are a lot of actions required by a deck (like shuffling and drawing), we decide that this is a good choice for a class.
- Hand-This class represents a gray area. Each player will have a hand. In this game, we will require that a player has a single hand. So it would be possible for a player to keep track of the cards without having to have a hand object. However, because it is theoretically possible for a player to have multiple hands, and because we might want to use the concept of a hand in other card games, we will keep this class. Remember that one of the goals of a design is to be extensible. If we create a good design for the blackjack game, perhaps we can reuse the classes later for other card games.
- Face value—The face value of the card is best represented as an attribute in the card class, so let's strike this as a class.
- Suit Again, this is a gray area. For the blackjack game, we do not need to keep track of the suit. However, there are card games that need to keep track of the suit. Thus, to make this class reusable, we should track it. However, the suit is not a good candidate for a class. It should be an attribute of a card, so we will strike it as a class.
- Ace—This could better be represented as an attribute of the card class, so let's strike it as a class.
- Face Cared─This could better be represented as attribute of the card class, so let's strike it as a class.
- King This could better be represented as attribute of the card class, so let's strike it as a class.
- Queen-This could better be represented as attribute of the card class, so let's strike it as a class.
- Bet-This class presents a dilemma. Technically you could play blackjack without a bet; however, the requirements statement clearly includes a bet in the description. The bet could be considered an attribute of the player in this case, but there are many other games where a player does not need to have a bet. In short, a bet is not a logical attribute of a player. Also abstracting out the bet is a good idea because we might want to bet various things. You can bet money, chips, your watch, your horse, or even the title to your house. Even though there might be many valid arguments not to make the bet a class, in this case we will.

We are left with six classes, as shown in Figure 6.5.

**Design Decisions**
The dealer could be a specific type of player and perhaps inherit from a player class. How- ever, this would be a design decision.

### Identifying the Classes' Responsibilities

Responsibilities relate to actions.You can generally identify responsibilities by selecting the verbs from the summary of the requirements. From this list you can glean your responsi- bilities. However, keep in mind the following:
- Not all verbs in the requirements summary will ultimately end up as responsibilities.
- You might need to combine several verbs to find an actual responsibility.
- Some responsibilities ultimately chosen will not be in the original requirements summary.
- Because this is an iterative process, you need to keep revising and updating both the requirements summary and the responsibilities.
- If two or more classes share a responsibility, each class will have the responsibility.

**Verbs**
Although it is true that verbs generally correlate with responsibilities, verbs are not the only places where responsibilities are found.

Let's take an initial stab at identifying the verbs, which will lead us down the path toward uncovering the responsibilities of our classes: If the player and the dealer have identical scores and at least 17, then it is considered a draw, and the player retains the bet.

Now let's make a list of the possible responsibilities for our classes:
**Card**
- Know its face value
- Know its suit
- Know its value
- Know whether it is a face card
- Know whether it is an ace
- Know whether it is a joker

**Deck**
- Shuffle
- Deal the next card
- Know how many cards are left in the deck
- Know whether there is a full deck to begin

**Hand**
- Know how many cards are in the hand
- Know the value of the hand
- Show the hand

**Dealer**
- Deal the cards
- Shuffle the deck
- Give a card to a player
- Show the dealer's hand
- Calculate the value of the dealer's hand
- Know the number of cards in the dealer's hand
- Request a card (hit or hold)
- Determine the winner
- Start a new hand

**Player**
- Request a card (hit or hold)
- Show the player's hand
- Calculate the value of the player's hand
- Know how many cards are in the hand
- Know whether the hand value is over 21
- Know whether the hand value is equal to 21 (and if it is a blackjack)
- Know whether the hand value is below 21

**Bet**
- Know the type of bet
- Know the value of the current bet
- Know how much the player has left to bet
- Know whether the bet can be covered

Remember that this is just the initial pass. You will want to iterate through this a number of times and make changes. You might even find that you've left an important responsibil- ity out or that you need to split one responsibility into two. Now let's explore the possible responsibilities. We are left with the following classes and responsibilities:

**Card**
- Know its face value

The card definitely needs to know this. Internally, this class must track the value of the card. Because this is an implementation issue, we don't want to phrase the re- sponsibility in this way. From an interface perspective, let's call this display face value.

- Know its suit

For the same reason as with face value, we will keep this responsibility, and rename it display name (which will identify the suit). However, we don't need this for black- jack. We will keep it for potential reuse purposes.

- Know whether it is a face card.

We could have a separate responsibility for face cards, aces, and jokers, but the report value responsibility can probably handle this. Strike this responsibility.

- Know whether it is an ace.

Same as previous item─let's strike this responsibility.

- Know whether it is a joker.

Same as previous, but notice that the joker was never mentioned in the require- ments statement. This is a situation where we can add a responsibility to make the class more reusable. However, the responsibility for the joker goes to the report value, so let's strike this responsibility.

**Class Design**
What to do with the jokers presents an interesting OO design issue. Should there be two separate classes-a superclass representing a regular deck of cards (sans jokers) and a subclass representing a deck of cards with the addition of the jokers? From an 00 purist's perspective, having two classes might be the right approach. However, having a single class with two separate constructors might also be a valid approach. What happens if you have decks of cards that use other configurations (such as no aces or no jacks)? Do we create a separate class for each, or do we handle them in the main class?

This is another design issue that ultimately has no right or wrong answer.

**Deck**
- Shuffle

We definitely need to shuffle the deck, so let's keep this one.

- Deal the next card

We definitely need to deal the next card, so let's keep this one.

- Know how many cards are left in the deck

At least the dealer needs to know if there are any cards left, so let's keep this one.

- Know if there is a full deck to begin.

The deck must know whether it includes all the cards. However, this might be strictly an internal implementation issue; in any event, let's keep this one for now.

**Hand**
- Know how many cards are in the hand

We definitely need to know how many cards are in a hand, so let's keep this one. However, from an interface perspective, let's rename this report the number of cards in the hand.

- Know the value of the hand

We definitely need to know the value of the hand, so let's keep this one. However, from an interface perspective, let's rename this report the value of the hand.

- Show the hand

We need to be able to see the contents of the hand.

**Dealer**
- Deal the cards

The dealer must be able to deal the initial hand, so let's keep this one.

- Shuffle the deck

The dealer must be able to shuffle the deck, so let's keep this one. Actually, should we make the dealer request that the deck shuffle itself? Possibly.

- Give a card to a player

The dealer must be able to add a card to a player's hand, so let's keep this one.

- Show the dealer's hand

We definitely need this functionality, but this is a general function for all players, so perhaps the hand should show itself and the dealer should request this. Let's keep it for now.

- Calculate the value of the dealer's hand

Same as previous. But the term calculate is an implementation issue in this case. Let's rename it show the value of the dealer's hand.

- Know the number of cards in the dealer's hand

Is this the same as show the value of the dealer's hand? Let's keep this for now, but re- name it show the number of cards in the dealers hand.

- Request a card (hit or hold)

A dealer must be able to request a card. However, because the dealer is also a player, is there a way that we can share the code? Although this is possible, for now we are going to treat a dealer and a player separately. Perhaps in another iteration through the design, we can use inheritance and factor out the commonality.

- Determine the winner

This depends on whether we want the dealer to calculate this or the game object. For now, let's keep it.

- Start a new hand

Let's keep this one for the same reason as the previous item.

**Player**
- Request a card (hit or hold)

A player must be able to request a card, so let's keep this one.

- Show the player's hand

We definitely need this functionality, but this is a general function for all players, so perhaps the hand should show itself and the dealer should request this. Let's keep this one for now.

- Calculate the value of the player's hand

Same as previous. But the term calculate is an implementation issue in this case. Let's rename this show the value of the player's hand.

- Know how many cards are in the hand

Is this the same as show the player's hand? Let's keep this for now, but rename it show the number of cards in the player's hand.

- Know whether the hand value is over 21, equal to 21 (including a blackjack), or be- low 21.

Who should make this determination? These are based on the specific rules of the game. The player definitely needs to know this to make a decision about whether to request a card. In fact, the dealer needs to do this, too. This could be handled in report the value of the hand.

**Bet**
- Know the type of bet

At this point, we will keep this for future reuse; however, for this game, we will re- quire that the type of the bet is always money.

- Know the value of the current bet

We need this to keep track of the value of the current bet. The player and the dealer need to know this. We will assume that the dealer (that is, the house) has an unlim- ited amount to bet.

- Know how much the player has left to bet

In this case, the bet can also act as the pool of money that the player has available. In this way, the player cannot make a bet that exceeds his resources.

- Know whether the bet can be covered

This is a simple response that allows the dealer (or the house) to determine whether the player can cover the bet.

As we iterate through the design process, we decide that we really do not want to have a separate bet class. If we need to, we can add it later. The decision needs to be based on two issues:
- Do we really need the class now or for future classes?
- Will it be easy to add later without a major redesign of the system?

After careful consideration, we decide that the bet class is not needed and most probably will not be needed later. We make an assumption that the payment method for all future bets will be money. An argument can be made that this approach might not be the best design decision. I can think of many reasons that we might want to have a bet object. There might be some behavior that should be encapsulated in a bet object. However, for now, we will scrap the bet object and make the dealer and players handle their own bets.

### UML Use-Cases: Identifying the Collaborations

To identify the collaborations, we need to study the responsibilities and determine what other classes the object interacts with. In short, what other classes does this object need to fulfill all its required responsibilities and complete its job? As you examine the collabora- tions, you might find that you have missed some necessary classes or that some classes you initially identified are not needed:
- To help discover collaborations, use-case scenarios can be used. A use-case is a trans- action or sequence of related operations that the system performs in response to a user request or event.
- For each use-case, identify the objects and the messages that it exchanges.

You might want to create collaboration diagrams to document this step. Obviously, there can be an infinite number of scenarios. The purpose of this part of the process is not nec- essarily to document all possible scenarios, which is an impossible task. The real purpose of creating use-case scenarios is to help you refine the choice of your classes and their re- sponsibilities.

By examining the collaborations, you might identify an important class that you missed. If this is the case, you can simply add another CRC card.You might also discover that one of the classes you originally chose is not as important as you once thought, so you can strike it and remove the CRC card from consideration. CRC cards help you dis- cover classes, whereas use-case scenarios help you discover collaborations.

For example, let's consider a single possible scenario. In this case, we have a dealer and a single player.
- Dealer shuffles deck
- Player makes bet
- Dealer deals initial cards
- Player adds cards to player's hand
- Dealer adds cards to dealer's hand
- Hand returns value of player's hand to player
- Hand returns value of dealer's hand to dealer
- Dealer asks player whether player wants another card
- Dealer deals player another card
- Player adds the card to player's hand
- Hand returns value of player's hand to player
- Dealer asks player whether player wants another card
- Dealer gets the value of the player's hand
- Dealer sends or requests bet value from players
- Player adds to/subtracts from player's bet attribute

Let's determine some of the collaborations. Assume that we have a main application that contains all the objects (that is, we do not have a Game class). As part of our design, we have the dealer start the game. Figures 6.6 through 6.15 present some collaboration dia- grams pertaining to this initial design.

### First Pass at CRC Cards

Now that we have identified the initial classes and the initial collaborations, we can com- plete the CRC cards for each class. It is important to note that these cards represent the initial pass only. In fact, although it is likely that many of the classes will survive the subse- quent passes, the final list of classes and their corresponding collaborations might look nothing like what was gleaned from the initial pass. This exercise is meant to explain the process and create an initial pass, not to come up with a final design. Completing the de- sign is a good exercise for you to undertake at the end of this chapter. Figures 6.16 through 6.20 present some CRC cards pertaining to this initial design.

### UML Class Diagrams: The Object Model

After you have completed the initial design using CRC cards, transfer the information contained on the CRC cards to class diagrams (see Figure 6.21). Note that this class dia- gram represents one possible design—it does not represent the initial pass of classes created during the previous exercise.The class diagrams go beyond the information on the CRC cards and might include such information as method parameters and return types. (Note that the UML diagrams in this book do not include method parameters.) Check out the options for the modeling tool that you have to see how information is presented.You can use the detailed form of the class diagram to document the implementation.

Remember that the purpose of this exercise is to identify the classes and their interfaces. All the methods listed are public. Now a light bulb should be going off in your head.

Even though the search for the interfaces does not lead directly to private attributes and even private methods, the process is helpful in determining these as well. As you iter- ate through the CRC process, note what attributes and private methods each class will re- quire.

### Prototyping the User Interface

As our final step in the OO design process, we must create a prototype of our user inter- face. This prototype will provide invaluable information to help navigate through the iter- ations of the design process. As Gilbert and McCarty in Object-Oriented Design in Java aptly point out, “to a system user, the user interface is the system.”There are several ways to cre- ate a user interface prototype.You can sketch the user interface by simply drawing it on paper or a whiteboard.You can use a special prototyping tool or even a language environ- ment like Visual Basic, which is often used for rapid prototyping. Or you can use the IDE from your favorite development tool to create the prototype.

However you develop the user interface prototype, make sure that the users have the final say on the look and feel.

## Conclusion

This chapter covers the design process for complete systems. It focuses on combining sev- eral classes to build a system. UML class diagrams represent this system. The example in this chapter shows the first pass at creating a design and is not meant to be a finished de- sign. Much iteration may be required to get the system model to the point where you are comfortable with it.

**Implementing Some Blackjack Code**
While working on the first edition of this book, I came across a complete implementation of a blackjack game in the book Java 1.1 Developers Guide by Jamie Jaworski. If you would like to actually get your hands dirty and write some code to implement another blackjack design, you might want to pick up this book. It is a very good, compressive Java book.

In the next several chapters, we explore in more detail the relationships between classes. Chapter 7, "Mastering Inheritance and Composition,” covers the concepts of inheritance and composition and how they relate to each other.