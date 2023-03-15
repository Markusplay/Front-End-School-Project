import { Button } from "@mui/material";
import Link from "next/link";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => (
  <div className={styles["page-content"]}>
    <h5 className={styles["not-found-text"]}>
      Упс! 404 помилка. Сторінку не знайдено.
    </h5>
    <div className={styles.button}>
      <Link href={"/"}>
        <Button variant="contained">Повернутися на головну</Button>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
