import ApiService from '../services/api-service';

class OrderForm {
    constructor(formId) {
        this.pending = false;
        this.send = false;
        this.formId = formId;
        this.formEl = document.getElementById(formId);

        if (this.formEl.elements.masterId) {
            this.mastersSelect = this.formEl.elements.masterId;
        } else {
            this.mastersSelect = 0;
        }

        if (this.formEl.elements.serviceId) {
            this.servicesSelect = this.formEl.elements.serviceId;
        } else {
            this.servicesSelect = this.formEl.elements.serviceId;
        }

        if (this.formEl.elements.masterId) {
            this._init();
        }

        this._bindEvents();
    }

    _init() {
        this._buildMastersSelect();
        this._buildServicesSelect();
    }

    async _buildMastersSelect() {
        try {
            const masters = await ApiService.getMasters();

            masters.forEach(master => {
                const option = document.createElement('option');
                option.value = master.id;
                option.textContent = `${master.surName} ${master.firstName}`;
                this.mastersSelect.add(option);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async _buildServicesSelect() {
        try {
            const masters = await ApiService.getSaloonServices();

            masters.forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = `${service.name}`;
                this.servicesSelect.add(option);
            });
        } catch (error) {
            console.error(error);
        }
    }

    _bindEvents() {
        this.formEl.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleForm();
        });
    }

    async _handleForm() {
        const orderData = {
            name: this.formEl.elements.name.value,
            phone: this.formEl.elements.phone.value,
            masterId: (this.formEl.elements.masterId) ? this.formEl.elements.masterId.value : 0,
            serviceId: (this.formEl.elements.serviceId) ? this.formEl.elements.serviceId.value : 0,
            visitDate: (this.formEl.elements.visitDate) ? this.formEl.elements.visitDate.value : 0,
        };

        this._togglePendingState();

        setTimeout(async () => {
            try {
                const orderResponse = await ApiService.createOrder(orderData);
                this.formEl.reset();

                if (orderResponse.status === 'Opened') {
                    this._toggleSendState();
                    setTimeout(() => {
                        this._toggleSendState();
                        $.fancybox.close()
                    }, 3000);
                };

                //показать сообщение об успехе
                //закрыть модалку
            } catch (error) {
                console.error(error);
            } finally {
                this._togglePendingState();
            }
        }, 3000);
    }

    _togglePendingState() {
        this.pending = !this.pending;
        this.formEl.classList.toggle('order-form_pending', this.pending);
    }

    _toggleSendState() {
        this.send = !this.send;
        document.getElementById(this.formId + '__send').classList.toggle(this.formId + '__send_visible', this.send);
    }
}

export default OrderForm;