import React from 'react';
import BubbleMap from './BubbleMap'; // Import your existing BubbleMap component
import SentimentMeter from './SentimentMeter'; // Import your existing SentimentMeter component
import SummaryBox from './SummaryBox'; // Import your existing SummaryBox component
import WorldMap from './WorldMap'; // Import your existing WorldMap component
import Graphs from './Graphs'; // Import your existing Graphs component

const Home = () => {
  return (
    <div className="home">
      <section className="bubble-map">
        <h2>Bubble Map</h2>
        <BubbleMap />
      </section>

      <section className="sentiment-meter">
        <h2>Sentiment Meter</h2>
        <SentimentMeter />
      </section>

      <section className="summary-box">
        <h2>Summary Box</h2>
        <SummaryBox />
      </section>

      <section className="world-map">
        <h2>World Map</h2>
        <WorldMap />
      </section>

      <section className="graphs">
        <h2>Graphs</h2>
        <Graphs />
      </section>
    </div>
  );
};

export default Home;
