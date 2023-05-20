package com.studi.bloc3api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.studi.bloc3api.Controllers.ProductController;
import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.repositories.ProductRepository;
import com.studi.bloc3api.repositories.UserRepository;
import com.studi.bloc3api.services.ProductService;
import com.studi.bloc3api.services.UserService;

@SpringBootTest
class ProductTests {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProductService productService;

    private ProductController productController;

    @BeforeEach
    public void setup() {
        when(userService.checkToken(any(String.class))).thenReturn("ok");
        productController = new ProductController(productService, userService);
    }

    @Test
    public void test_createProduct() {

        // Arrange
        Product p = new Product();
        p.name = "pull";

        // Asset
        when(productRepository.save(any(Product.class))).thenReturn(p);

        // test
        assertEquals(productController.createProduct("ok", p).name, "pull");
    }

    @Test
    public void test_getProducts() {
        // Arrange
        Product p = new Product();
        p.price = 111;
        List<Product> products = new ArrayList<>();
        products.add(p);

        // Asset
        when(productRepository.findAll()).thenReturn(products);

        // test
        List<Product> results = productController.getProducts();
        assertEquals(results.size(),1);
        assertEquals(results.get(0).price, 111);
    }

    @Test
    public void test_updateProduct_findProduct() {

        // Arrange
        Product pToUse = new Product();
        pToUse.name = "test";
        pToUse.id = 1;

        Product pFakeFromBase = new Product();
        pFakeFromBase.name = "base";
        pFakeFromBase.picture = "base64";
        pFakeFromBase.id = 1;

        Product expectedFusion = new Product();
        expectedFusion.name = "test";
        expectedFusion.picture = "base64";
        expectedFusion.id = 1;

        // Asset
        when(productRepository.findById(pToUse.id)).thenReturn(Optional.of(pFakeFromBase));
        when(productRepository.save(any(Product.class))).thenReturn(expectedFusion);

        // test
        Product p = productController.updateProduct(any(String.class), pToUse.id, pToUse);
        assertEquals(p.name, pToUse.name);
        assertEquals(p.picture, pFakeFromBase.picture);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void test_updateProduct_NotfoundProduct() {

        // Arrange
        Product pToUse = new Product();
        pToUse.name = "test";
        pToUse.id = 1;

        // Asset
        when(productRepository.findById(pToUse.id)).thenReturn(Optional.ofNullable(null));

        // test
        Product p = productController.updateProduct(any(String.class), pToUse.id, pToUse);
        assertNull(p);
        verify(productRepository, times(0)).save(any(Product.class));
    }

    @Test
    public void test_updatePromotion_findProduct() {

        // Arrange
        Product pToUse = new Product();
        pToUse.id = 1;
        pToUse.promoPercent = 4;

        Product pFakeFromBase = new Product();
        pFakeFromBase.id = 1;
        pFakeFromBase.promoPercent = 2;

        // Asset
        when(productRepository.findById(pToUse.id)).thenReturn(Optional.of(pFakeFromBase));
        when(productRepository.save(any(Product.class))).thenReturn(pToUse);

        // test
        Product p = productController.updateProduct(any(String.class), pToUse.id, pToUse);
        assertEquals(p.promoPercent, pToUse.promoPercent);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void test_updatePromotion_NotfoundProduct() {

        // Arrange
        Product pToUse = new Product();
        pToUse.id = 1;
        pToUse.promoPercent = 4;

        // Asset
        when(productRepository.findById(pToUse.id)).thenReturn(Optional.ofNullable(null));

        // test
        Product p = productController.updateProduct(any(String.class), pToUse.id, pToUse);
        assertNull(p);
        verify(productRepository, times(0)).save(any(Product.class));
    }
}
