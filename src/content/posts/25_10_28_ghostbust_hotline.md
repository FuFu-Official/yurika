---
title: Ghostbust Hotline
published: 2025-10-28
pinned: false
description: A 2D top-down dungeon-crawling shooter RPG featuring intense action and strategic gameplay.
tags: [Project, Coding, GameDev]
category: Project
licenseName: "Unlicensed"
author: FuFu
sourceLink: "https://github.com/FuFutheBest/ENGR100/tree/main/project2"
draft: false
date: 2025-10-28
image: "/posts/ghostbust_hotline/thumbnail.jpg"
pubDate: 2025-10-28
---

<style>
  .project-container {
    max-width: 1000px;
    margin: 0 auto;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    border-radius: 15px;
    color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .hero-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-section .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }

  .video-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  .video-container:hover {
    transform: translateY(-5px);
  }

  .video-container video {
    width: 100%;
    height: auto;
    display: block;
  }

  .description-section {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
    border-left: 5px solid #667eea;
  }

  .description-section p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .description-section a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 0.3s ease;
  }

  .description-section a:hover {
    border-bottom-color: #667eea;
  }

  .play-button {
    display: inline-block;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 1rem 0;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .play-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    color: white;
    text-decoration: none;
  }

  .section-title {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 2.5rem 0 1.5rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #667eea;
    display: inline-block;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .resource-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-color: #667eea;
  }

  .resource-card i {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
  }

  .resource-card h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .resource-card a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .developers-section {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 15px;
    text-align: center;
    margin: 2rem 0;
  }

  .studio-logo {
    max-width: 200px;
    margin: 1rem auto;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .developers-list {
    font-size: 1.2rem;
    margin: 1.5rem 0;
    font-weight: 500;
  }

  .tagline {
    font-style: italic;
    font-size: 1.1rem;
    opacity: 0.9;
    margin-top: 1rem;
  }

  .acknowledgements-section {
    background: #2d3436;
    color: white;
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
  }

  .tech-stack {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .tech-item {
    background: #74b9ff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .gameplay-section {
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 15px;
    margin: 2rem 0;
  }

  .gameplay-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .gameplay-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .gameplay-card h4 {
    color: #ffeaa7;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .gameplay-card p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .weapon-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.8rem 0;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .weapon-icon {
    font-size: 2rem;
    min-width: 50px;
    text-align: center;
  }

  .weapon-details h5 {
    margin: 0 0 0.5rem 0;
    color: #ffeaa7;
  }

  .weapon-details p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .control-hint {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    margin: 0.3rem;
    font-size: 0.9rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2rem;
    }

    .hero-section .subtitle {
      font-size: 1rem;
    }

    .resources-grid {
      grid-template-columns: 1fr;
    }

    .tech-stack {
      flex-direction: column;
      align-items: center;
    }

    .gameplay-grid {
      grid-template-columns: 1fr;
    }

    .weapon-info {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

<div class="project-container">
  <div class="hero-section">
    <h1>🎮 Ghostbust Hotline</h1>
    <div class="subtitle">
      Experience the thrill of supernatural combat in this action-packed 2D
      adventure
    </div>
  </div>

  <div class="video-container">
    <video controls autoplay loop muted>
      <source src="/posts/ghostbust_hotline/trailer.mp4" type="video/mp4" />
      Your browser does not support the video type.
    </video>
  </div>

<h2 class="section-title">🕹️ Game Overview</h2>

![Ghostbust Hotline](/posts/ghostbust_hotline/ghostbust_hotline.png)

 <div class="description-section">
    <p>
      Ghostbust Hotline is an immersive 2D top-down
      dungeon-crawling shooter RPG that combines intense action with strategic
      gameplay. Built using Elm programming language and
      powered by the innovative 2D game engine
      <a href="https://github.com/elm-messenger/Messenger" target="_blank"
        >Messenger</a
      >, this game delivers a unique gaming experience.
    </p>
    <p>
      This project was developed as part of the UM-SJTU Joint Institute ENGR100 Introduction to Engineering
      course, showcasing our team's technical skills and creative vision.
      Explore the complete
      <a
        href="https://github.com/FuFutheBest/ENGR100/tree/main/project2"
        target="_blank"
        >source code</a
      >
      on GitHub and see how we brought this supernatural adventure to life.
    </p>
    <p>
      Ready to dive into the action? The game is live and hosted on
      <a href="https://focs.ji.sjtu.edu.cn/silverfocs" target="_blank"
        >Silverfocs</a
      >, the official course platform.
    </p>

<div style="text-align: center; margin: 2rem 0">
      <a
        href="https://focs.ji.sjtu.edu.cn/silverfocs/demo/2025/p2team02/"
        target="_blank"
        class="play-button"
      >
        🎯 Play Game Online
      </a>
</div>
</div>

<h2 class="section-title">🎮 How to Play</h2>
<div class="gameplay-section">
    <div style="text-align: center; margin-bottom: 2rem">
      <h3 style="margin-bottom: 1rem; font-size: 1.5rem">
        Master the Art of Ghost Hunting
      </h3>
      <p style="font-size: 1.1rem; opacity: 0.9">
        Learn the essential mechanics to survive the supernatural dungeon
      </p>
    </div>

<div class="gameplay-grid">
      <div class="gameplay-card">
        <h4>🎯 Getting Started</h4>
        <p>Begin your ghostbusting adventure with these essential controls:</p>
        <div style="margin: 1rem 0">
          <span class="control-hint">SPACE</span> Skip story sequences
        </div>
        <div style="margin: 1rem 0">
          <span class="control-hint">ARROW KEYS</span> Navigate in main menu
        </div>
        <div style="margin: 1rem 0">
          <span class="control-hint">ENTER</span> Confirm selection
        </div>
        <div style="margin: 1rem 0">
          <span class="control-hint">WASD</span> Move character
        </div>
        <div style="margin: 1rem 0">
          <span class="control-hint">Mouse</span> Control aim and two weapons
        </div>
        <div style="margin: 1rem 0">
          <span class="control-hint">Z</span> Skip dialogue in-game
        </div>
      </div>

<div class="gameplay-card">
        <h4>⚔️ Weapon Arsenal</h4>
        <p>Master two specialized weapons to defeat supernatural enemies:</p>

<div class="weapon-info">
          <div class="weapon-icon" style="color: #74b9ff">🔵</div>
          <div class="weapon-details">
            <h5>Ghost-Neutralizer</h5>
            <p>Blue weapon that defeats revealed ghosts and deals damage</p>
            <p style="font-size: 0.85rem; color: #a8dadc; margin-top: 0.5rem">
              💡 <strong>Power Shot:</strong> Hold right-click to charge for
              stronger attacks with less MP cost and penetration ability
            </p>
          </div>
        </div>

<div class="weapon-info">
          <div class="weapon-icon" style="color: #ffeaa7">🟡</div>
          <div class="weapon-details">
            <h5>Ghostmarker</h5>
            <p>Yellow weapon that reveals hidden ghosts for targeting</p>
          </div>
        </div>

<div style="margin-top: 1rem">
          <span class="control-hint">RIGHT CLICK</span> Switch between two weapons
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.8">
          <span class="control-hint">HOLD LEFT CLICK</span> (Blue mode) Charge
          powerful shot
        </div>
      </div>

<div class="gameplay-card">
        <h4>👻 Ghost Mechanics</h4>
        <p>Understanding your enemies is key to survival:</p>
        <ul style="list-style: none; padding: 0">
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #fd79a8">👥</span> Ghosts start completely
            invisible
          </li>
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #fdcb6e">🔍</span> Only their shadows are
            visible initially
          </li>
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #e17055">⚠️</span> Attacks on invisible ghosts
            deal no damage
          </li>
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #00b894">✨</span> Use Ghostmarker to reveal
            them first
          </li>
        </ul>
      </div>

<div class="gameplay-card">
        <h4>🗝️ Dungeon Progression</h4>
        <p>Navigate through multiple floors with strategic gameplay:</p>
        <ul style="list-style: none; padding: 0">
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #e84393">🏆</span> Defeat the floor boss
          </li>
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #f39c12">🗝️</span> Find and collect the key
            (collision-based)
          </li>
          <li
            style="
              margin: 0.8rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <span style="color: #00cec9">🚪</span> Locate the exit door
          </li>
        </ul>
        <div style="margin-top: 1rem">
          <span class="control-hint">R KEY</span> Pick up key
        </div>
        <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8">
          Complete both objectives to unlock the next floor!
        </p>
      </div>
    </div>

<div
      style="
        text-align: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      "
    >
      <p style="font-size: 1.1rem; opacity: 0.9">
        📖 <strong> Project Booklet</strong> - Learn more game mechanics and
        design philosophy.
        <a
          href="/posts/ghostbust_hotline/booklet.pdf"
          target="_blank"
          style="
            color: #ffeaa7;
            text-decoration: none;
            border-bottom: 2px solid #ffeaa7;
          "
        >
          Download Project Booklet
        </a>
      </p>
    </div>
  </div>

<h2 class="section-title">📚 Project Resources</h2>
  <div class="resources-grid">
    <div class="resource-card">
      <i>📖</i>
      <h3>Project Booklet</h3>
      <p>Comprehensive guide covering gameplay instructions and design process</p> 
      <a href="/posts/ghostbust_hotline/booklet.pdf" target="_blank"
        >Download PDF</a
      >
    </div>
    <div class="resource-card">
      <i>🎨</i>
      <h3>Project Poster</h3>
      <p>Visual presentation of key features and achievements</p>
      <a href="/posts/ghostbust_hotline/poster.pdf" target="_blank"
        >View Poster</a
      >
    </div>
    <div class="resource-card">
      <i>📋</i>
      <h3>Elm Documentation</h3>
      <p>Complete API documentation and code reference</p>
      <a
        href="https://focs.ji.sjtu.edu.cn/silverfocs/elm-doc/2025/p2team02/packages/SilverFOCS-25/p2team02/latest/"
        target="_blank"
        >View Documentation</a
      >
    </div>
  </div>

  <h2 class="section-title">👥 Development Team</h2>
  <div class="developers-section">
    <img
      src="/posts/ghostbust_hotline/lolipopstudios.png"
      alt="Lolipop Studios Logo"
      class="studio-logo"
    />
    <div class="developers-list">
      <strong>Apeel Subedi • Hongrui Fu • Tiantong Li</strong>
    </div>
    <div class="tagline">"Sweet ideas, crunchy gameplay" 🍭</div>
  </div>

  <h2 class="section-title">🙏 Acknowledgements</h2>
  <div class="acknowledgements-section">
    <p style="text-align: center; margin-bottom: 1.5rem">
      This project was made possible thanks to:
    </p>
    <div class="tech-stack">
      <span class="tech-item">💻 Developed in Elm</span>
      <span class="tech-item">⚡ Powered by Gitea</span>
      <span class="tech-item">🏭 Engineered by Lolipop Studios</span>
    </div>
  </div>
</div>
