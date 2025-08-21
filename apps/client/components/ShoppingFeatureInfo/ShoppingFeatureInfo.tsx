"use client";

import { Title, Text, Image } from "@mantine/core";
import styles from "./ShoppingFeatureInfo.module.css";
import { IconShoppingBag } from "@tabler/icons-react";

export default function ShoppingFeatureInfo() {
  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <div className={styles.main}>
          <div className={styles.content}>
            <Title order={1} className={styles.title}>
              <IconShoppingBag stroke={1.5} size={36} /> Shopping & Business Made Easy
            </Title>

            <Text className={styles.description}>
              Launch your <strong>own shop</strong> in just a few clicks.  
              Manage your products, update prices, and keep your catalog fresh 
              with an intuitive interface.  
              <br /><br />
              Stay on top of performance with an interactive{" "}
              <strong>dashboard and analytics</strong> that track your sales and growth.  
              <br /><br />
              Customers can <strong>chat & inquire</strong> about items in real time, 
              while you manage your entire business seamlessly from one place.  
              The smarter way to sell, scale, and succeed.
            </Text>
          </div>

          <Image
            src="/images/shopping-dashboard.jpeg"
            alt="Shopping dashboard illustration"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
