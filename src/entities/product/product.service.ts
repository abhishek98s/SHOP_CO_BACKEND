import * as ProductDAO from './product.repository';

export const getTopSellingProducts = async () => {
    return await ProductDAO.fetchTopSellingProducts();
};

export const getNewSellingProducts = async () => {
    return await ProductDAO.fetchNewSellingProducts();
};

export const getProductDetail = async (productId: number) => {
    return await ProductDAO.fetchProductDetail(productId);
};
