import { Router } from 'express';
import { authToken } from '../../middleware/auth.middleware';
import { checkBodyCreateUser, checkResultInputsCreateUser, checkBodyInputsSignin, checkResultInputsSignin } from '../../middleware/checkInputs.meddleware';
import { onCreateNewUser, onSignIn, onUpdateDataByUserID, onDeleteUser, onGetDataUser } from './handlers';

const router: Router = Router();

router.get('/', authToken, onGetDataUser);
router.post('/create-user', checkBodyCreateUser, checkResultInputsCreateUser, onCreateNewUser);
router.post('/sign-in', checkBodyInputsSignin, checkResultInputsSignin, onSignIn);
router.put('/update', authToken, onUpdateDataByUserID);
router.delete('/delete/:id', authToken, onDeleteUser);

export default router;