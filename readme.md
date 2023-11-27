| Name        | Description   |
|-------------|---------------|
| Project     | Family - The Home of Phygitals     |
| Description | A Luxury-Tech Clothing Brand |
| Team        | James Albarracin, Azeez Mumeen, Shashank Singh Solanki |
| Contact     | support@familylyx.com |
| App         | [familylyx.web.app](https://familylyx.web.app/) |
| Source      | [browse here](http://github.com/source) |
| Demo        | [Walkthrough video](http://youtube.com/demo) |

![Family Banner](https://imgur.com/eYU3PFE)

# Family - The Home of Phygitals

Embracing the power of LUKSO's innovative standards, our brand is pioneering a seamless integration of physical garments with their digital identities. Each meticulously crafted physical piece in our collection is embedded with an NFC chip, forming a tangible link to a corresponding digital asset. This subtle yet profound fusion is our gateway to introduce consumers to the Web3 experience without imposing the complexities of blockchain technology upon them. Our approach is designed with the consumer's comfort in mind: the blockchain remains an invisible backbone, supporting a future where transitioning into Web3 is as simple as wearing your favourite hoodie. With this, we're not just selling fashion; we're offering a passport to an emergent digital realm, with the promise of further exploration at the wearer's discretion.

## Ordering/Purchasing:

Recognising the gap between the tech-savvy and the uninitiated, we've designed a system that marries the simplicity of traditional Web2 commerce with the innovation of Web3. Customers can shop our cutting-edge products using familiar methods—signing in with an email and checking out with fiat currency. Post-purchase, they receive a unique "placeholder NFT," securely stored within our platform. This acts as both a proof of ownership and a potential bridge to the world of Web3, allowing them to step into the realm of digital assets at their own pace and comfort. It's a seamless integration of two worlds, inviting a broader audience to experience the future of fashion and technology without the barriers

## NFT-NFC Linkage:

We create a robust link between physical assets and digital NFTs (Non-Fungible Tokens) by leveraging NFC (Near Field Communication) technology. Each of our physical assets carries an NFC chip holding a unique identifier. This identifier is registered on the blockchain alongside the corresponding NFT's details, establishing a tamper-proof linkage between the physical and digital realms. Hardware Used: NFC Chip: NTAG Series or Mifare Series (We're using a NTAG213 Chip for our demo) NTAG Series - Used for normal simple authentication where security is not the most paramount importance Mifare Series - Used for secured applications and services such as adding bank cards, car key fobs, gym cards etc (The NFC chip is enclosed in a silicone badge to ensure protection of the hardware against the environment)

## Marketplace + Escrow:

Our dedicated marketplace is designed to empower our community to securely engage in peer-to-peer transactions of their cherished phygitals. Our platform incorporates an advanced escrow service that safeguards both parties during the exchange process. As the phygital item changes hands, our embedded NFC technology serves as a critical touch point for authentication—our escrow will prompt the receiver to scan the chip which will validate the product's authenticity and triggers the escrow to seamlessly transfer the NFT to the buyer and the funds to the seller. Committed to inclusivity, we've also integrated a fiat payment gateway, inviting individuals from all walks of life to participate in our ecosystem with ease, making the leap into the Web3 space as smooth and secure as possible.

## Overall Contribution to the LUKSO Ecosystem:

- Our NFC-embedded phygital products bridge the gap between the physical and digital worlds, serving as a template for others in the LUKSO ecosystem looking to explore similar concepts.

- The blockchain's immutable nature facilitates accurate provenance tracking, allowing for a transparent history of asset ownership and authenticity verification. This is invaluable for high-value goods, collectibles, or any creative work where authenticity and origin are paramount.

- By bridging the physical and digital realms, a new dimension of user experience is unlocked. Consumers can interact with both physical and digital versions of an asset, enhancing engagement and creating unique user experiences.

- Tokenizing physical assets creates new economic opportunities. For instance, it can enable new marketplaces for buying, selling, or trading tokenized versions of physical assets. The development of a secure P2P marketplace with integrated escrow services using LUKSO technology creates a precedent for safe and trustworthy digital transactions within the ecosystem.

- By providing a standardised way of linking physical assets to the blockchain, communities can engage with brands and creators in a more interactive and meaningful way. This can foster stronger community relationships and open up collaborative opportunities.

- By attracting fashion enthusiasts who may not be familiar with blockchain, our project helps expand the LUKSO ecosystem's user base. This diversification can lead to increased adoption and recognition of LUKSO's platform.

- Our project's focus on community building, engagement, and participation using LUKSO’s technology fosters a vibrant community within the LUKSO ecosystem, driving further network growth and collaboration.

- As active participants in the LUKSO ecosystem, we can provide valuable feedback and suggestions for improvements, contributing to the overall refinement and evolution of the LUKSO standards/tools.

## LUKSO Standards Used (LSPs):

LSP2: It utilizes LSP2Utils from LUKSO's smart contract library, it helps in managing and validating data in accordance with the LSP2-ERC725Y JSON schema standard.

LSP7: Used for payments in our Marketplace

LSP8: Foundational standard for our **Phygitals** and **Digitals**

LSP14: The contract extends LSP14Ownable2Step from LUKSO's smart contract library, which is a standard for ownership management in a two-step process enhancing security during ownership transfer.

LSP17: Gives an extension to users to mint our tokens who have made a payment

LSP20: Used to verify the registration of NFC Chip with NFT


# Hackathon Walkthrough
## Ordering + Purchasing
1. Login to our App, via **Email** or **Universal Profile**
   - If you're using an email, you will be sent a 1-time login link (Check junk mail)

2. Purchase a **Phygital** or **Digital** product via LYX or Fiat
   - Make sure you fund your Universal Profile with LYXt here: https://faucet.testnet.lukso.network/
   - If you want to use Fiat, follow these instructions:

		| Name        | Description   |
		|-------------|---------------|
		| Card Number | 4242 4242 4242 4242 |
		| Expiry Date | A valid future date |
		| CVC         | Any 3 digits |

## Registration
1. If you purchased a **Phygital**, check your **Orders** tab under Inventory.
   - You will need to **Register** the asset with a NFC Chip here:
   - If you're using an **Email Login** you will need to create an UP to **Register**
  
2. If you purchased a **Digital**, check your **Digitals** tab under Inventory.
   - If you're using an **Email Login** you will need to create an UP to fully utilise the asset (Trade/Sell)

## Marketplace
1. To **Sell** your **Phygital**, you must input the 6-Digit code of your paired NFC Chip
   - Fill in the necessary details to complete the listing
   - The **Phygital** can only be listed on our marketplace
2. You can list your **Digital** on any LUKSO marketplace
3. **Buying** a **Phygital** on our marketplace will re-direct you to our **Escrow** to ensure the safety of both parties involved

## Escrow
1. Both parties enter our **Escrow** service where they can communicate whilst the physical asset is in transit to the buyer
2. The **Escrow** can only be released by the **Buyer** by inputting the 6-digit code inside the NFC Chip which is embedded on the physical asset.
  






