package com.studi.bloc3api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

import com.studi.bloc3api.Controllers.ProductController;
import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.repositories.ProductRepository;
import com.studi.bloc3api.services.ProductService;
import com.studi.bloc3api.services.UserService;

@SpringBootTest
class ProductsTests {

	@InjectMocks
    private ProductController productController;

    @Mock
    private ProductService productService;

	@Mock
	private UserService userService;

	@Mock
    private ProductRepository productRepository;

    @BeforeEach
    public void setup() {
        //when(userService.checkToken(null)).thenReturn("ok");
    }

	@Test
    public void test_createProduct() {
		
		Product p = new Product();
		p.name="pull";
        p.categoryId=1;
        p.description="ok";
        p.id=1;
        p.picture="okkk";
        p.price = 10;

		when(productRepository.save(p)).thenReturn(p);
        when(productService.getProductRepository()).thenReturn(productRepository);
        assertThat(productController.createProduct(null, p).name, is("pull"));
    }

    // public void test_getProducts() {
	// 	Product p = new Product();
	// 	p.price=111;
	// 	List<Product> products = new ArrayList<>();
	// 	products.add(p);

    //     when(productService.getProducts()).thenReturn(products);
    //     assertThat(productController.getProducts().get(0).price, is(111));
    // }

    // public void test_updateProduct() {
	// 	Product p = new Product();
	// 	p.name="pull";
	// 	when(userService.checkToken(null)).thenReturn("ok");
    //     // when(productService.updateProduct(p)).thenReturn(p);
    //     // assertThat(productController.updateProduct(null, p).name, is("pull"));
    // }
}
