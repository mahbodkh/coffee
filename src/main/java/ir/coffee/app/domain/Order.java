package ir.coffee.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Order extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "tele_phone")
    private String telePhone;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "latitude")
    private String latitude;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Order address(String address) {
        this.address = address;
        return this;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Order postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public String getTelePhone() {
        return telePhone;
    }

    public void setTelePhone(String telePhone) {
        this.telePhone = telePhone;
    }

    public Order telePhone(String telePhone) {
        this.telePhone = telePhone;
        return this;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Order longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Order latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Order user(User user) {
        this.user = user;
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", telePhone='" + getTelePhone() + "'" +
            ", longitude='" + getLongitude() + "'" +
            ", latitude='" + getLatitude() + "'" +
            "}";
    }
}
