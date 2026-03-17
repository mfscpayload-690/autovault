# AutoVault

A car specs and comparison webapp built for our KTU S4 DBMS Micro Project (PCCST402).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Framer Motion, Vite |
| Backend | Node.js, Express.js |
| Database | MySQL 8 (raw SQL, no ORM) |
| Auth | JWT + bcrypt (HTTP-only cookies) |
| Security | Helmet, CORS, express-rate-limit, express-validator |

## Features

- Browse 45+ Indian cars with full specifications
- Predictive search with FULLTEXT indexing
- Side-by-side comparison of up to 3 cars
- Smart EV/ICE spec tabs on car detail pages
- Filter by brand, fuel type, body type, price range, and transmission
- Spec badges (Most Fuel Efficient, Fastest 0-100, etc.) via SQL window functions
- Dark/light theme
- Admin panel for managing cars, brands, users, and audit logs
- Image uploads via Multer with URL fallback

## Getting Started

```bash
# Database
sudo mariadb -e "CREATE DATABASE IF NOT EXISTS autovault;"
sudo mariadb autovault < backend/sql/schema.sql
sudo mariadb autovault < backend/sql/seed.sql

# Backend
cd backend
cp .env.example .env    # edit with your DB credentials
npm install
npx nodemon server.js

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

## Team

<table>
  <tr>
    <td align="center"><a href="https://github.com/unknownguyoffline"><img src="https://github.com/unknownguyoffline.png" width="100" style="border-radius:50%;" alt="Abhishek H"/><br /><b>Abhishek H</b></a></td>
    <td align="center"><a href="https://github.com/RR-Alen-06"><img src="https://github.com/RR-Alen-06.png" width="100" style="border-radius:50%;" alt="Alen Sajan"/><br /><b>Alen Sajan</b></a></td>
    <td align="center"><a href="https://github.com/Aaromal665"><img src="https://github.com/Aaromal665.png" width="100" style="border-radius:50%;" alt="Aaromal V"/><br /><b>Aaromal V</b></a></td>
    <td align="center"><a href="https://github.com/mfscpayload-690"><img src="https://github.com/mfscpayload-690.png" width="100" style="border-radius:50%;" alt="Aravind Lal"/><br /><b>Aravind Lal</b></a></td>
    <td align="center"><a href="https://github.com/Madhavs225"><img src="https://github.com/Madhavs225.png" width="100" style="border-radius:50%;" alt="Madhav S"/><br /><b>Madhav S</b></a></td>
    <td align="center"><a href="https://github.com/SreeramSNair-7"><img src="https://github.com/SreeramSNair-7.png" width="100" style="border-radius:50%;" alt="Sreeram S Nair"/><br /><b>Sreeram S Nair</b></a></td>
  </tr>
</table>

## License

[MIT](LICENSE)
