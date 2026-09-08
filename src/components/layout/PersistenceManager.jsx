import { useEffect } from "react";
import { startProgressSync } from "../../services/progressSync";
export default function PersistenceManager() {
  useEffect(() => startProgressSync(), []);
  return null;
}
