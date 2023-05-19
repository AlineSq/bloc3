// package com.studi.bloc3api;

// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.springframework.boot.test.context.SpringBootTest;
// import static org.hamcrest.MatcherAssert.assertThat;
// import static org.hamcrest.Matchers.is;
// import static org.mockito.Mockito.when;

// import java.util.ArrayList;
// import java.util.List;

// import com.studi.bloc3api.Controllers.CategoryController;
// import com.studi.bloc3api.Controllers.ProductController;
// import com.studi.bloc3api.models.Category;
// import com.studi.bloc3api.models.Product;
// import com.studi.bloc3api.repositories.CategoryRepository;
// import com.studi.bloc3api.repositories.ProductRepository;
// import com.studi.bloc3api.services.CategoryService;
// import com.studi.bloc3api.services.ProductService;
// import com.studi.bloc3api.services.UserService;


// class CategoriesTests {

// 	@InjectMocks
//     private final CategoryController categoryController = new CategoryController();

// 	@Mock
// 	private UserService userService;

//     @Mock
//     private CategoryService categoryService;

// 	@Mock
//     private CategoryRepository categoryRepository;


// 	@Test
//     public void test_createCategory() {
		
// 		Category c = new Category();
// 		c.name="divers";
// 		when(userService.checkToken(null)).thenReturn("ok");
//         when(categoryService.createCategory(c)).thenReturn(c);
//         assertThat(categoryController.createCategory(null, c).name, is("divers"));
//     }

//     @Test
//     public void test_getProducts() {
// 		Product p = new Product();
// 		p.price=111;
// 		List<Product> products = new ArrayList<>();
// 		products.add(p);

//         when(productService.getProducts()).thenReturn(products);
//         assertThat(productController.getProducts().get(0).price, is(111));
//     }

// 	@Test
//     public void test_updateProduct() {
// 		Product p = new Product();
// 		p.name="pull";
// 		when(userService.checkToken(null)).thenReturn("ok");
//         when(productService.updateProduct(p)).thenReturn(p);
//         assertThat(productController.updateProduct(null, p).name, is("pull"));
//     }
// }
