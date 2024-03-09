import {
  getAssetToken,
} from "../controllers/get-asset-token.js";

router.post("/get", getAssetToken);

export default router;
