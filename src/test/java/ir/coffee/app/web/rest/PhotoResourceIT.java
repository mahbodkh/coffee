package ir.coffee.app.web.rest;

import ir.coffee.app.CoffeeApp;
import ir.coffee.app.domain.Photo;
import ir.coffee.app.repository.PhotoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PhotoResource} REST controller.
 */
@SpringBootTest(classes = CoffeeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PhotoResourceIT {

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    private static final Long DEFAULT_SIZE = 1L;
    private static final Long UPDATED_SIZE = 2L;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPhotoMockMvc;

    private Photo photo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Photo createEntity(EntityManager em) {
        Photo photo = new Photo()
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .imageUrl(DEFAULT_IMAGE_URL)
            .name(DEFAULT_NAME)
            .height(DEFAULT_HEIGHT)
            .weight(DEFAULT_WEIGHT)
            .size(DEFAULT_SIZE);
        return photo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Photo createUpdatedEntity(EntityManager em) {
        Photo photo = new Photo()
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .imageUrl(UPDATED_IMAGE_URL)
            .name(UPDATED_NAME)
            .height(UPDATED_HEIGHT)
            .weight(UPDATED_WEIGHT)
            .size(UPDATED_SIZE);
        return photo;
    }

    @BeforeEach
    public void initTest() {
        photo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhoto() throws Exception {
        int databaseSizeBeforeCreate = photoRepository.findAll().size();
        // Create the Photo
        restPhotoMockMvc.perform(post("/api/photos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(photo)))
            .andExpect(status().isCreated());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeCreate + 1);
        Photo testPhoto = photoList.get(photoList.size() - 1);
        assertThat(testPhoto.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPhoto.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testPhoto.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testPhoto.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPhoto.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testPhoto.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testPhoto.getSize()).isEqualTo(DEFAULT_SIZE);
    }

    @Test
    @Transactional
    public void createPhotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = photoRepository.findAll().size();

        // Create the Photo with an existing ID
        photo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhotoMockMvc.perform(post("/api/photos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(photo)))
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPhotos() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        // Get all the photoList
        restPhotoMockMvc.perform(get("/api/photos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(photo.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.intValue())));
    }
    
    @Test
    @Transactional
    public void getPhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        // Get the photo
        restPhotoMockMvc.perform(get("/api/photos/{id}", photo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(photo.getId().intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPhoto() throws Exception {
        // Get the photo
        restPhotoMockMvc.perform(get("/api/photos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        int databaseSizeBeforeUpdate = photoRepository.findAll().size();

        // Update the photo
        Photo updatedPhoto = photoRepository.findById(photo.getId()).get();
        // Disconnect from session so that the updates on updatedPhoto are not directly saved in db
        em.detach(updatedPhoto);
        updatedPhoto
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .imageUrl(UPDATED_IMAGE_URL)
            .name(UPDATED_NAME)
            .height(UPDATED_HEIGHT)
            .weight(UPDATED_WEIGHT)
            .size(UPDATED_SIZE);

        restPhotoMockMvc.perform(put("/api/photos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPhoto)))
            .andExpect(status().isOk());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeUpdate);
        Photo testPhoto = photoList.get(photoList.size() - 1);
        assertThat(testPhoto.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPhoto.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testPhoto.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testPhoto.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPhoto.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testPhoto.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testPhoto.getSize()).isEqualTo(UPDATED_SIZE);
    }

    @Test
    @Transactional
    public void updateNonExistingPhoto() throws Exception {
        int databaseSizeBeforeUpdate = photoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhotoMockMvc.perform(put("/api/photos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(photo)))
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        int databaseSizeBeforeDelete = photoRepository.findAll().size();

        // Delete the photo
        restPhotoMockMvc.perform(delete("/api/photos/{id}", photo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
