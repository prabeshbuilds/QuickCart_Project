# QuickCart - A simple eCommerce website

QuickCart is an open-source **Next.js eCommerce frontend** project.  
It provides a modern, fast and customizable shopping UI.  
This repo is **frontend only** – contributors can improve the design, add new pages, animations and more.





---

## Features

-   Built with **Next.js + Tailwind CSS**
-   Responsive design
-   Reusable components
-   Customizable layouts and colors
-   Open for contributions (UI/UX, animations, themes, layouts etc.)

---

## Getting Started

1. Clone the repo

    ```bash
    git clone https://github.com/GreatStackDev/QuickCart.git
    cd QuickCart
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run locally

    ```bash
    npm run dev
    ```

---

## Monitoring

This project includes Prometheus and Grafana monitoring through Docker Compose.

1. Start the app and monitoring stack

    ```bash
    docker compose up -d --build
    ```

2. Open the services

    - App: http://localhost:3000
    - Prometheus: http://localhost:9090
    - Grafana: http://localhost:3001

Grafana is provisioned with Prometheus as the default data source and includes a **QuickCart Overview** dashboard. The default Grafana login is `admin` / `admin`.

Prometheus scrapes the Next.js metrics endpoint at:

```text
http://nextjs-app:3000/api/metrics
```

---

## Contributing

We welcome all kinds of contributions! You can:

- Create new pages
- Improve layouts
- Add animations and transitions
- Enhance responsiveness
- Refactor components
- Suggest new UI/UX ideas
- Add themes or color variations
- Introduce accessibility improvements
- Add filtering/search features
- Improve documentation

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the **MIT License**.

---

## 🌟 Contributors

Thanks to everyone who contributes to **QuickCart**!# QuickCart_Project
