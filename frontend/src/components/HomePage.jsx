import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Clock, FileText, User } from "lucide-react";
import Navbar from "./Navbar";
import "./HomePage.css";

function HomePage() {
  const cards = [
    {
      title: "Capsules",
      description: "Manage and view your stored memories",
      icon: LayoutGrid,
      path: "/home/capsules",
      colorClass: "card-capsules",
    },
    {
      title: "Timeline",
      description: "Take a journey through your history",
      icon: Clock,
      path: "/home/timeline",
      colorClass: "card-timeline",
    },
    {
      title: "AI Summary",
      description: "Get smart insights from your vault",
      icon: FileText,
      path: "/home/summary",
      colorClass: "card-summary",
    },
    {
      title: "View Profile",
      description: "Access your account settings",
      icon: User,
      path: "/home/profile",
      colorClass: "card-profile",
    },
  ];

  return (
    <div className="homepage-root">
      <Navbar />
      <main className="homepage-content">
        <header className="homepage-header">
          <h1>Welcome to MemoryVault</h1>
          <p>What would you like to explore today?</p>
        </header>

        <div className="cards-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link to={card.path} key={index} className={`action-card ${card.colorClass}`}>
                <div className="card-icon-wrapper">
                  <Icon size={32} />
                </div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div className="card-hover-effect"></div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default HomePage;