import { Router } from 'express';
import { authToken } from '../../middleware/auth.middleware';
import { checkBodyAddAddress, checkResultInputsCreateAddress } from '../../middleware/checkInputs.meddleware';
import { onCreateNewAddress } from './handlers';

const router: Router = Router();

router.post('/create-address', authToken, checkBodyAddAddress, checkResultInputsCreateAddress, onCreateNewAddress);
// router.post('/sign-in', checkBodyInputsSignin, checkResultInputsSignin, onSignIn);
// router.post('/update', authToken, onUpdateDataByUserID);
// router.get('/delete/:id', authToken, onDeleteUser);

export default router;