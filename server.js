// Endpoint untuk mereset data satu CS
app.post('/api/reset/:cs', async (req, res) => {
    const cs = req.params.cs;
    try {
        const db = await readDb();
        if (db.csData[cs]) {
            // Reset data CS ke nilai default
            db.csData[cs] = { "revisiDashboard": 0, "revisiElementor": 0, "revisiSatumomen": 0, "shopeePesanan": 0, "balasWA": 0, "pesanMasukWA": 0, "balasShopee": 0 };
            await writeDb(db);
            res.status(200).json({ status: 'success', message: `Data for ${cs} reset.` });
        } else {
            res.status(404).json({ error: 'CS not found' });
        }
    } catch (error) {
        console.error('Error handling reset request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint untuk mereset SEMUA data (khusus admin)
app.post('/api/reset-all', async (req, res) => {
    try {
        const initialData = {
            csData: {
                "admin1": { "revisiDashboard": 0, "revisiElementor": 0, "revisiSatumomen": 0, "shopeePesanan": 0, "balasWA": 0, "pesanMasukWA": 0, "balasShopee": 0 },
                "admin2": { "revisiDashboard": 0, "revisiElementor": 0, "revisiSatumomen": 0, "shopeePesanan": 0, "balasWA": 0, "pesanMasukWA": 0, "balasShopee": 0 },
                "admin3": { "revisiDashboard": 0, "revisiElementor": 0, "revisiSatumomen": 0, "shopeePesanan": 0, "balasWA": 0, "pesanMasukWA": 0, "balasShopee": 0 }
            }
        };
        await writeDb(initialData);
        res.status(200).json({ status: 'success', message: 'All data reset.' });
    } catch (error) {
        console.error('Error handling reset-all request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Tambahkan ini di bagian bawah setelah semua endpoint
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});