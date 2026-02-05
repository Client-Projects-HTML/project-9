/*
 * Heavy Equipment Rental - Dashboard JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initEquipment();
    initUserManagement();
    initOrderManagement();
    initSettings();
});



/* =========================================
   Order Management (View, Approve, Export)
   ========================================= */
function initOrderManagement() {
    const ordersTable = document.getElementById('orders-table');
    const modal = document.getElementById('order-modal');
    const exportBtn = document.getElementById('export-data-btn');

    if (!ordersTable || !modal) return;

    // Handle Table Actions
    ordersTable.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;

        const orderId = row.getAttribute('data-order-id');

        // View Order
        if (e.target.closest('.view-order')) {
            document.getElementById('view-order-id').textContent = `#${orderId}`;
            document.getElementById('view-customer-name').textContent = row.querySelector('.customer-name').textContent;
            document.getElementById('view-equipment-name').textContent = row.querySelector('.equipment-name').textContent;
            document.getElementById('view-order-total').textContent = row.querySelector('.order-total').textContent;

            const statusBadge = row.querySelector('.order-status');
            const modalStatus = document.getElementById('view-order-status');
            modalStatus.textContent = statusBadge.textContent;
            modalStatus.className = statusBadge.className;

            modal.classList.add('active');
        }
    });

    // Close Modal
    const closeModal = () => modal.classList.remove('active');
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Export Data
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            alert('Exporting order data to CSV...');
        });
    }

    // Status Filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            const selectedStatus = e.target.value;
            const rows = ordersTable.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const statusBadge = row.querySelector('.order-status');
                const rowStatus = statusBadge ? statusBadge.textContent.trim() : '';

                if (selectedStatus === 'All Status' || rowStatus === selectedStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}



/* =========================================
   User Management (Add, Edit, Delete)
   ========================================= */
function initUserManagement() {
    const userTable = document.getElementById('users-table');
    const modal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const addUserBtn = document.getElementById('add-user-btn');
    const modalTitle = document.getElementById('modal-title');
    const editUserId = document.getElementById('edit-user-id');

    if (!userTable || !modal) return;

    // Open Modal for Add
    addUserBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Add New User';
        userForm.reset();
        editUserId.value = '';
        modal.classList.add('active');
    });

    // Close Modal
    const closeModal = () => modal.classList.remove('active');
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-cancel').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle Table Actions (Edit / Delete)
    userTable.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;

        const userId = row.getAttribute('data-user-id');

        // Edit
        if (e.target.closest('.edit-user')) {
            modalTitle.textContent = 'Edit User';
            editUserId.value = userId;

            // Populate form
            document.getElementById('modal-user-name').value = row.querySelector('.user-name').textContent;
            document.getElementById('modal-user-email').value = row.querySelector('.user-email').textContent;
            document.getElementById('modal-user-role').value = row.querySelector('.user-role').textContent;
            document.getElementById('modal-user-status').value = row.querySelector('.user-status').textContent;

            modal.classList.add('active');
        }

        // Delete
        if (e.target.closest('.delete-user')) {
            const userName = row.querySelector('.user-name').textContent;
            if (confirm(`Are you sure you want to delete user "${userName}"?`)) {
                row.remove();
                console.log(`User ${userId} deleted`);
            }
        }
    });

    // Handle Form Submit (Mock Add/Edit)
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('modal-user-name').value;
        const email = document.getElementById('modal-user-email').value;
        const role = document.getElementById('modal-user-role').value;
        const status = document.getElementById('modal-user-status').value;
        const userId = editUserId.value;

        if (userId) {
            // Edit existing row
            const row = userTable.querySelector(`tr[data-user-id="${userId}"]`);
            if (row) {
                row.querySelector('.user-name').textContent = name;
                row.querySelector('.user-email').textContent = email;

                const roleBadge = row.querySelector('.user-role');
                roleBadge.textContent = role;
                roleBadge.className = `badge ${role === 'Admin' ? 'bg-danger-soft' : (role === 'Staff' ? 'bg-success-soft' : 'bg-info-soft')} user-role`;

                const statusBadge = row.querySelector('.user-status');
                statusBadge.textContent = status;
                statusBadge.className = `badge ${status === 'Active' ? 'bg-success-soft' : (status === 'Pending' ? 'bg-warning-soft' : 'bg-danger-soft')} user-status`;
            }
        } else {
            // Add new row (mock)
            const newId = Date.now();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-user-id', newId);

            const roleClass = role === 'Admin' ? 'bg-danger-soft' : (role === 'Staff' ? 'bg-success-soft' : 'bg-info-soft');
            const statusClass = status === 'Active' ? 'bg-success-soft' : (status === 'Pending' ? 'bg-warning-soft' : 'bg-danger-soft');
            const avatarClass = role === 'Admin' ? 'bg-danger-soft' : (role === 'Staff' ? 'bg-success-soft' : 'bg-primary-soft');

            newRow.innerHTML = `
                <td class="ps-4">
                    <div class="d-flex align-items-center gap-3">
                        <div class="${avatarClass} rounded-circle d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; min-width: 45px;">
                            <i class="bi bi-person-fill fs-5"></i>
                        </div>
                        <div>
                            <div class="fw-bold user-name">${name}</div>
                            <div class="text-muted small user-email">${email}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge ${roleClass} user-role">${role}</span></td>
                <td><span class="badge ${statusClass} user-status">${status}</span></td>
                <td>${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td class="text-end pe-4">
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-outline btn-sm edit-user" style="width: 34px; height: 34px; padding: 0;" title="Edit"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-outline btn-sm border-danger text-danger delete-user" style="width: 34px; height: 34px; padding: 0;" title="Delete"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            `;
            userTable.querySelector('tbody').prepend(newRow);
        }

        closeModal();
        console.log(userId ? `User ${userId} updated` : 'New user added');
    });
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

/* =========================================
   Equipment Filtering & Sorting
   ========================================= */
const equipmentData = [
    {
        id: 1,
        name: "Cat 320 Excavator",
        category: "Excavators",
        status: "Rented",
        price: 1200,
        popularity: 95,
        image: "excavator.png" // Placeholder
    },
    {
        id: 2,
        name: "Komatsu D61 Dozer",
        category: "Dozers",
        status: "Available",
        price: 1500,
        popularity: 80,
        image: "dozer.png"
    },
    {
        id: 3,
        name: "Liebherr LTM 1120 Crane",
        category: "Cranes",
        status: "Available",
        price: 2500,
        popularity: 60,
        image: "crane.png"
    },
    {
        id: 4,
        name: "Cat 950 Loader",
        category: "Loaders",
        status: "Maintenance",
        price: 900,
        popularity: 85,
        image: "loader.png"
    },
    {
        id: 5,
        name: "Hitachi ZX200 Excavator",
        category: "Excavators",
        status: "Available",
        price: 1100,
        popularity: 90,
        image: "excavator2.png"
    },
    {
        id: 6,
        name: "Cat D6 Dozer",
        category: "Dozers",
        status: "Rented",
        price: 1600,
        popularity: 75,
        image: "dozer2.png"
    }
];

let currentFilter = 'all';
let currentSort = 'popularity';

function initEquipment() {
    const equipmentList = document.getElementById('equipment-list');
    if (!equipmentList) return; // Only run on equipment page

    // Initial Render
    renderAndFilterEquipment();

    // Filter Listeners
    // Filter Listeners (Event Delegation)
    const filterContainer = document.getElementById('equipment-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            console.log('Filter button clicked:', btn.getAttribute('data-filter'));

            // Update UI
            const allButtons = filterContainer.querySelectorAll('button');
            allButtons.forEach(b => {
                b.classList.remove('btn-warning', 'active');
                b.classList.add('btn-outline-secondary');
            });
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-warning', 'active');

            // Update Logic
            currentFilter = btn.getAttribute('data-filter');
            renderAndFilterEquipment();
        });
    }

    // Sort Listener
    const sortSelect = document.getElementById('equipment-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderAndFilterEquipment();
        });
    }

    // Equipment List Listeners (Edit/Delete)
    if (equipmentList) {
        equipmentList.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-equipment');
            const deleteBtn = e.target.closest('.delete-equipment');

            if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'));
                const item = equipmentData.find(eq => eq.id === id);
                if (item) openEquipmentModal(item);
            }

            if (deleteBtn) {
                const id = parseInt(deleteBtn.getAttribute('data-id'));
                const name = deleteBtn.getAttribute('data-name');
                if (confirm(`Are you sure you want to delete ${name}?`)) {
                    const index = equipmentData.findIndex(eq => eq.id === id);
                    if (index > -1) {
                        equipmentData.splice(index, 1);
                        renderAndFilterEquipment();
                    }
                }
            }
        });
    }

    // Edit Modal Logic
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-equipment-form');
    const closeBtn = editModal ? editModal.querySelector('.btn-close') : null;
    const cancelBtn = document.getElementById('close-edit-modal');

    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const idVal = document.getElementById('edit-id').value;

            const itemData = {
                name: document.getElementById('edit-name').value,
                category: document.getElementById('edit-category').value,
                price: parseInt(document.getElementById('edit-price').value),
                status: document.getElementById('edit-status').value,
                popularity: 0, // Default for new
                image: "placeholder.png"
            };

            if (idVal) {
                // Update
                const id = parseInt(idVal);
                const index = equipmentData.findIndex(eq => eq.id === id);
                if (index > -1) {
                    equipmentData[index] = { ...equipmentData[index], ...itemData };
                }
            } else {
                // Create
                const newId = equipmentData.length > 0 ? Math.max(...equipmentData.map(e => e.id)) + 1 : 1;
                equipmentData.push({ id: newId, ...itemData });
            }

            closeEditModalFunc();
            renderAndFilterEquipment();
        });
    }

    if (closeBtn) closeBtn.onclick = closeEditModalFunc;
    if (cancelBtn) cancelBtn.onclick = closeEditModalFunc;

    // Add New Equipment Listener
    const addBtn = document.getElementById('add-equipment-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            openEquipmentModal();
        });
    }
}

function openEquipmentModal(item = null) {
    const modal = document.getElementById('edit-modal');
    const modalTitle = modal ? modal.querySelector('h3') : null;
    const submitBtn = document.getElementById('edit-equipment-form').querySelector('button[type="submit"]');

    if (item) {
        // Edit Mode
        if (modalTitle) modalTitle.textContent = 'Edit Equipment';
        if (submitBtn) submitBtn.textContent = 'Update Equipment';
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-category').value = item.category;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-status').value = item.status;
    } else {
        // Add Mode
        if (modalTitle) modalTitle.textContent = 'Add New Equipment';
        if (submitBtn) submitBtn.textContent = 'Add Equipment';
        document.getElementById('edit-id').value = '';
        document.getElementById('edit-equipment-form').reset();
    }

    if (modal) modal.classList.add('active');
}

function closeEditModalFunc() {
    const modal = document.getElementById('edit-modal');
    if (modal) modal.classList.remove('active');
}

function renderAndFilterEquipment() {
    const listContainer = document.getElementById('equipment-list');
    if (!listContainer) return;

    // 1. Filter
    let filteredData = equipmentData.filter(item => {
        if (currentFilter === 'all') return true;
        return item.category === currentFilter;
    });

    // 2. Sort
    filteredData.sort((a, b) => {
        switch (currentSort) {
            case 'popularity':
                return b.popularity - a.popularity; // Descending
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    // 3. Render
    listContainer.innerHTML = '';

    if (filteredData.length === 0) {
        listContainer.innerHTML = '<p class="text-muted text-center w-100 py-5">No equipment found.</p>';
        return;
    }

    filteredData.forEach(item => {
        const card = document.createElement('div');
        // Ensure responsive width: fit in row, but min width constraint
        card.style.flex = '1 0 250px';
        card.className = 'card';

        let statusColor = 'text-muted';
        if (item.status === 'Available') statusColor = 'text-success';
        if (item.status === 'Rented') statusColor = 'text-primary';
        if (item.status === 'Maintenance') statusColor = 'text-danger';

        const statusStyle = item.status === 'Available' ? 'color: green;' : (item.status === 'Maintenance' ? 'color: red;' : '');

        card.innerHTML = `
            <h4 class="mb-2">${item.name}</h4>
            <p class="text-muted small">Category: ${item.category} | Price: $${item.price}/day</p>
            <p class="text-muted small">Status: <span class="${statusColor} fw-bold" style="${statusStyle}">${item.status}</span></p>
            <div class="d-flex gap-2 mt-3">
                <button class="btn btn-outline py-1 px-2 edit-equipment" data-id="${item.id}" style="font-size: 0.8rem;">Edit</button>
                <button class="btn btn-outline py-1 px-2 delete-equipment" data-id="${item.id}" data-name="${item.name}" style="font-size: 0.8rem; border-color: red; color: red;">Delete</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function initSettings() {
    const settingsForm = document.getElementById('settings-form');
    if (!settingsForm) return;

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const siteName = document.getElementById('site-name-input').value;
        const adminEmail = document.getElementById('admin-email-input').value;

        // Visual feedback for all submit buttons
        const saveBtns = document.querySelectorAll('button[type="submit"][form="settings-form"], #settings-form button[type="submit"]');

        saveBtns.forEach(btn => {
            btn.dataset.originalText = btn.textContent;
            btn.textContent = 'Saving...';
            btn.disabled = true;
        });

        // Mock API call
        setTimeout(() => {
            saveBtns.forEach(btn => {
                btn.textContent = 'Settings Saved!';
                btn.classList.replace('btn-primary', 'btn-success');
            });

            // Update site name in sidebar if changed
            const brands = document.querySelectorAll('.brand');
            brands.forEach(brand => {
                if (brand.innerHTML.includes('Heavy<span')) {
                    brand.innerHTML = `${siteName.replace('Rent', '')}<span class="text-primary">${siteName.includes('Rent') ? 'Rent' : ''}</span> <span style="font-size: 0.8rem; background: var(--color-primary); color: black; padding: 2px 5px; border-radius: 4px;">Admin</span>`;
                }
            });

            console.log('Settings updated:', { siteName, adminEmail });

            setTimeout(() => {
                saveBtns.forEach(btn => {
                    btn.textContent = btn.dataset.originalText;
                    btn.classList.replace('btn-success', 'btn-primary');
                    btn.disabled = false;
                });
            }, 2000);
        }, 800);
    });
}
