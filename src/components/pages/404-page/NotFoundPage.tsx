import { Button } from "@mui/material";
import Link from "next/link";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => (
  <div className={styles["page-content"]}>
    <h3 className={styles["not-found-text"]}>
      Упс! 404 помилка. Сторінку не знайдено.
    </h3>
    <div className={styles.button}>
      <Link href={"/"}>
        <div className="button">
          <Button variant="outlined">Повернутися на головну</Button>
        </div>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
