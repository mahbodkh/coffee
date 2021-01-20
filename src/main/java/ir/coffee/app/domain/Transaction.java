package ir.coffee.app.domain;

import ir.coffee.app.domain.enumeration.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Transaction extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "bank_error")
    private String bankError;

    @Column(name = "receipt_number")
    private String receiptNumber;

    @Column(name = "description")
    private String description;

    @Column(name = "stan")
    private String stan;

    @OneToOne
    @JoinColumn(name = "order_id", unique = true)
    private Order order;

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Transaction status(Status status) {
        this.status = status;
        return this;
    }

    public String getBankError() {
        return bankError;
    }

    public void setBankError(String bankError) {
        this.bankError = bankError;
    }

    public Transaction bankError(String bankError) {
        this.bankError = bankError;
        return this;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public Transaction receiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Transaction description(String description) {
        this.description = description;
        return this;
    }

    public String getStan() {
        return stan;
    }

    public void setStan(String stan) {
        this.stan = stan;
    }

    public Transaction stan(String stan) {
        this.stan = stan;
        return this;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Transaction order(Order order) {
        this.order = order;
        return this;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Transaction user(User user) {
        this.user = user;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", bankError='" + getBankError() + "'" +
            ", receiptNumber='" + getReceiptNumber() + "'" +
            ", description='" + getDescription() + "'" +
            ", stan='" + getStan() + "'" +
            "}";
    }
}
