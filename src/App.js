import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import Question from './screen/Question';
import Review from './screen/Review';
import Order from './screen/Order';
import OrderDetail from './screen/orders/OrderDetail';
import './App.css';
import Login from './screen/login/Login';
import Customer from './screen/Customer';
import Notice from './screen/Notice';
import NoticeEditor from './component/notice/NoticeEditor';
import NoticeDetail from './component/notice/NoticeDetail';
import {
  MAIN,
  LOGIN,
  QUESTION,
  REVIEW,
  CUSTOMER,
  ORDER,
  ORDER_DETAIL,
  ORDER_CANCELED,
  NOTICE,
  NOTICE_DETAIL,
  NOTICE_EDITOR,
  PATH_PRODUCT,
  PATH_PRODUCT_DETAIL,
  LICENSE,
  SALES,
  PATH_IMAGE_EDITOR,
  PATH_IMAGE_EDITOR_PREVIEW_DETAIL,
} from './constants/path';
import Product from './screen/product/Product';
import ProductDetail from './screen/product/ProductDetail';
import License from './screen/License';
import Sales from './screen/Sales';
import ImageEditorSetting from './screen/image-editor/page.tsx';
import PreviewEffectDetail from './screen/image-editor/preview-effects/[previewEffectId]/page.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN} element={<Main />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={QUESTION} element={<Question />} />
        <Route path={REVIEW} element={<Review />} />
        <Route path={CUSTOMER} element={<Customer />} />
        <Route path={ORDER} element={<Order />} />
        <Route path={ORDER_DETAIL} element={<OrderDetail />} />
        <Route path={ORDER_CANCELED} element={<OrderDetail canceled />} />
        <Route path={NOTICE} element={<Notice />} />
        <Route path={NOTICE_EDITOR} element={<NoticeEditor />} />
        <Route path={NOTICE_DETAIL} element={<NoticeDetail />} />
        <Route path={PATH_PRODUCT} element={<Product />} />
        <Route path={PATH_IMAGE_EDITOR} element={<ImageEditorSetting />} />
        <Route path={PATH_IMAGE_EDITOR_PREVIEW_DETAIL} element={<PreviewEffectDetail />} />
        <Route path={PATH_PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={LICENSE} element={<License />} />
        <Route path={SALES} element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
