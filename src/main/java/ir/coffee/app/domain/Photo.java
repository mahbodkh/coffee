package ir.coffee.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Photo.
 */
@Entity
@Table(name = "photo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Photo extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "name")
    private String name;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "size")
    private Long size;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Photo image(byte[] image) {
        this.image = image;
        return this;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Photo imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Photo imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Photo name(String name) {
        this.name = name;
        return this;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Photo height(Integer height) {
        this.height = height;
        return this;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Photo weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Photo size(Long size) {
        this.size = size;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Photo product(Product product) {
        this.product = product;
        return this;
    }
// jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Photo)) {
            return false;
        }
        return id != null && id.equals(((Photo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Photo{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", name='" + getName() + "'" +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", size=" + getSize() +
            "}";
    }
}
