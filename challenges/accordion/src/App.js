import { useState } from 'react';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  // Lift up state to control accordion allow open single item and close other items
  const [currentOpenedNum, setCurrentOpenedNum] = useState(null);
  return (
    <div className="accordion">
      {data.map((element, index) => (
        <AccordionItem
          num={index}
          title={element.title}
          key={element.title}
          currentOpenedNum={currentOpenedNum}
          onOpen={setCurrentOpenedNum}
        >
          {/* Use children prop make content more flexable */}
          {element.text}
        </AccordionItem>
      ))}
      <AccordionItem
        num={22}
        title="Custom title?"
        key="Custom title?"
        currentOpenedNum={currentOpenedNum}
        onOpen={setCurrentOpenedNum}
      >
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ num, title, currentOpenedNum, onOpen, children }) {
  const isOpen = num === currentOpenedNum;
  const handleToggle = () => {
    onOpen(isOpen ? null : num);
  };
  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
