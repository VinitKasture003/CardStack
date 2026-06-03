import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import "./Stack.css";
import ThoughtBubble from "../ThoughtBubble/ThoughtBubble.jsx";
import { p1, p2, p3, p4, p5, p6, p7, p8, p9, s1, s2, s3 } from "../../Helper/ImagesHelper.js";

const CardStack = ({ onSendToBack, sensitivity, children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className="card-rotate"
            style={{
                x, y, rotateX, rotateY,
            }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: "grabbing" }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
};



const Stack = ({
    randomRotation = false,
    sensitivity = 200,
    cardDimensions = { width: 280, height: 280 },
    cardsData = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
}) => {
    const [allCards, setAllCards] = useState(
        [
            { id: 1, img: s1, script: "Arre ek baar sun to le." },
            { id: 2, img: s2, script: "La*di" },
            { id: 3, img: p3, script: "Kya baat krni hai usse?" },
            { id: 4, img: s1, script: "Keh raha tha… usse tu pasand hai" },
            { id: 5, img: p6, script: "Main? Why me?" },
            { id: 6, img: s1, script: "Uska kehna hai… tujhme kuch alag si vibe hai" },
            { id: 7, img: p1, script: "Vibe?" },
            { id: 8, img: s1, script: "Haan, keh raha tha 'tu full main-character energy hai'" },
            { id: 9, img: s1, script: "Jab wo tujhe dekhta hai na, background literally blur ho jaata hai." },
            { id: 10, img: p1, script: "Matlab camera effect ya feelings?" },
            { id: 11, img: s1, script: "Dono" },
            { id: 12, img: s1, script: "Aur haan, keh raha tha 'agar tu haan bol de, to wo full softboi ban jaayega'." },
            { id: 13, img: p1, script: "Acha? Dekhte hain phir, kitna soft hota hai." },
            { id: 14, img: s1, script: "Hope detected." },
            { id: 15, img: p1, script: "Usko kya kaam hai mujhse? Time nahi hai abhi." },
            { id: 16, img: s1, script: "Vinit aaya hai… tujhe milna chahta hai" },
            { id: 17, img: p2, script: "Bol na" },
            { id: 18, img: s3, script: "Sun!" },
        ]);

    function resetCards() {
        return [
            { id: 15, img: p1, script: "Usko kya kaam hai mujhse? Time nahi hai abhi." },
            { id: 16, img: s1, script: "Vinit aaya hai… tujhe milna chahta hai" },
            { id: 17, img: p2, script: "Bol na" },
            { id: 18, img: s3, script: "Sun!" }
        ];
    }
    const [cards, setCards] = useState([]);

    const [script, setScript] = useState();

    const sendToBack = (id) => {
        setCards((prev) => {
            const newCards = [...prev];
            const firstElm = newCards[0];
            const index = newCards.findIndex((card) => card.id === id);
            newCards.splice(index, 1);

            let cardToBeAdded;

            if (firstElm.id === allCards[allCards.length - 4].id && id === allCards[allCards.length - 1].id) {
                cardToBeAdded = allCards.findIndex(newCard => newCard.id === 1);
            } else if (id === allCards[allCards.length - 5].id && firstElm.id === allCards[allCards.length - 2].id) {
                return resetCards();
            } else {
                cardToBeAdded = allCards.findIndex(newCard => newCard.id === (firstElm.id + 1));
            }


            newCards.unshift(allCards[cardToBeAdded]);
            setScript(newCards[newCards.length - 1]?.script);
            return newCards;
        });
    };
    useEffect(() => {
        setCards(resetCards());
    }, [])

    useEffect(() => {
        if (cards.length > 0) {
            setScript(cards[cards.length - 1].script);
        }
    }, [cards]);

    return (
        <div
            className="stack-container"
            style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                perspective: 600,
                margin: "auto",
            }}
        >
            <ThoughtBubble thought={script} />
            <br />
            <br />
            <br />
            <br />
            {cards && cards.map((card, index) => {
                const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

                return (
                    <CardStack key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
                        <motion.div
                            className="card"
                            onClick={() => sendToBackOnClick && sendToBack(card.id)}
                            animate={{
                                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                                scale: 1 + index * 0.06 - cards.length * 0.06,
                                transformOrigin: "90% 90%",
                            }}
                            initial={false}
                            transition={{
                                type: "spring",
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping,
                            }}
                            style={{
                                width: cardDimensions.width,
                                height: cardDimensions.height,
                                boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8)`,
                            }}
                        >
                            <img src={card.img} alt="Image" loading="lazy" style={{ width: '100%', height: 'auto' }} />
                        </motion.div>
                    </CardStack>
                );
            })}
        </div>
    );
};

export { Stack };
