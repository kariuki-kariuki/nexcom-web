### Installation (Frontend)

1. Clone the repository:
```bash
git clone https://github.com/kariuki-kariuki/nexcom-web.git
cd nexcom-web
```

2. Install dependencies:
```
npm install 
or
yarn install
```

3. Create a `.env.local` file in the root directory and add the required environment   variables (see above for defaults). For production, update to your backend URLs.

4. Run the development server:
``` bash
npm run dev
or
yarn dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser. The app should now be running with real-time features (assuming backend is up).

**Note**: This repo handles the frontend. For the full stack, set up the NestJS backend separately (e.g., clone from `kariuki-kariuki/nexcom-backend` if available) and ensure it runs on `http://localhost:4000`.

---

### Setting Up Daraja API (M-Pesa Integration)

Daraja API enables M-Pesa payments (e.g., STK Push for C2B transactions). This is primarily configured in the **backend (NestJS)**, but the frontend initiates requests via API calls. Follow these steps:

#### Prerequisites
- Register for a Safaricom Developer Account at [developer.safaricom.co.ke](https://developer.safaricom.co.ke/).
- Create an app in the sandbox (for testing) or production environment to get credentials.

#### Steps
1. **Obtain Credentials**:
- Log in to the Daraja portal.
- Generate:
  - Consumer Key
  - Consumer Secret
  - Shortcode (Paybill/Till Number)
  - Passkey (for sandbox; get from portal)
- For production, submit your app for approval (see [Safaricom's Go-Live Guide](https://developer.safaricom.co.ke/APIs#Go-Live)).

2. **Backend Setup (NestJS)**:
- In your backend repo, install the Daraja SDK (if not already):

```bash
npm install @juzna/mpesa
or use axios for raw API calls
npm install axios
```
- Add environment variables to `.env` (backend):

```bash
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=http://yourdomain.com/callback  # e.g., ngrok URL for local testing
MPESA_CONFIRMATION_URL=http://yourdomain.com/confirmation
```

- Implement the integration (example for STK Push in a NestJS service):
```typescript
// src/mpesa/mpesa.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MpesaService {
  private baseUrl = 'https://sandbox.safaricom.co.ke';  // Use 'https://api.safaricom.co.ke' for production

  async stkPush(phone: string, amount: number, accountRef: string) {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const { data: { access_token } } = await axios.post(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {}, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    return axios.post(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountRef,
      TransactionDesc: 'Payment for order',
    }, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }
}
```
- Expose an endpoint (e.g., /payments/stk-push) in your controller to call this service.
- Handle callbacks in a dedicated route for validation.

3. **Frontend Integration (Next.js):**
- From the frontend, call the backend API (e.g., via fetch in a payment component):
``` typescript
// components/PaymentButton.tsx
const handlePayment = async () => {
  const response = await fetch('/api/payments/stk-push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '2547xxxxxxxx', amount: 100, reference: 'order-123' }),
  });
  const { CheckoutRequestID } = await response.json();
  // Poll or use WebSocket for status updates
};
```
- Update NEXT_PUBLIC_URL to point to your backend.

4. **Testing:**
- Use Daraja Sandbox Simulator for STK Push.
- Test end-to-end: Trigger payment from frontend → Backend processes → Receive callback.

For full tutorials, see [NestJS Daraja Implementation](https://github.com/topics/daraja-mpesa).

---

### Setting Up Docker Compose(Full Stack)

Docker Compose orchestrates the frontend, backend, and database for easy local/prod deployment. Create a docker-compose.yml in the root (or backend if separate).

#### Prerequisites

Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

#### Steps

1. **Create docker-compose.yml:**
``` yml
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend  # Create this if needed
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_URL=http://backend:4000
      - NEXT_PUBLIC_WS_URL=ws://backend:4000
    depends_on:
      - backend
    volumes:
      - .:/app  # For hot reload in dev

  backend:
    build:
      context: ../nexcom-backend  # Adjust to backend path
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/nexcom  # Or MongoDB
      # Add Daraja env vars here
    depends_on:
      - db
    volumes:
      - ../nexcom-backend:/app  # For hot reload

  db:
    image: postgres:15  # Or mongo:5 for MongoDB
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: nexcom
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

2. **Create Dockerfiles if missing:**
- Dockerfile (backend, NestJS):
``` bash
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 4000
```
- Dockerfile.frontend (Next.js):
``` bash
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
```
3. **Run:**
``` bash
docker-compose up -d  # Detached mode
docker-compose logs -f  # View logs
```

Access frontend at [http://localhost:4000](http://localhost:4000).

---

### Setting Up NGROK (Local Tunneling for WebSockets/Testing)
NGROK exposes your local server to the internet, ideal for testing WebSockets, callbacks (e.g., Daraja), or mobile app integrations.

#### Prerequisites

- Download [NGROK](https://ngrok.com/download) and sign up for a free account (for static domains). 

#### Steps

1. **Install and authenticate:**
``` bash
# Unzip and add to PATH
ngrok authtoken YOUR_AUTHTOKEN  # From ngrok.com dashboard
```

2. **Expose Services:**
- For frontend (HTTP):
``` bash
ngrok http 4000
```
Copy the public URL (e.g., https://abc123.ngrok.io) and update any mobile/external tests.
- For backend/WebSockets (use TCP for raw sockets, or HTTP for ws://):
``` bash
ngrok http 4000  # For HTTP/WebSocket over HTTP
# Or for pure TCP: ngrok tcp 4000
```
- Update env vars: NEXT_PUBLIC_WS_URL=wss://your-ngrok-url.ngrok.io (use wss for secure).

3. **For Daraja Callbacks:**
- Set MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/callback in backend env.
- Restart services and test payments.

4. **Config File (Optional, for persistence):**
   
   Create ngrok.yml:
``` yaml
version: 2
authtoken: YOUR_AUTHTOKEN
tunnels:
  frontend:
    addr: 3000
    proto: http
  backend:
    addr: 4000
    proto: http
```
Run: ngrok start --all.

For Next.js specifics, see [NGROK in Next.js](https://medium.com/@rumimaz/ngrok-in-next-js-af52fa320fa6).

---