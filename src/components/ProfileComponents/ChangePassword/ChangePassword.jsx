import React, { useState } from 'react';

const ChangePassword = ({ username, email }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Először küldjük el a régi jelszót az ellenőrzéshez
        try {
            const loginResponse = await fetch('https://thomasapi.eu/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                mode: "cors",
                body: JSON.stringify({
                    "UserName": username,
                    "Password": oldPassword
                })
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok && loginData.token) {
                // Ha a bejelentkezés sikeres, elküldjük az új jelszót
                const updateResponse = await fetch('https://thomasapi.eu/api/profileupdate', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${loginData.token}`
                    },
                    mode: "cors",
                    body: JSON.stringify({
                        "UserName": username,
                        "Password": newPassword,
                        "EmailAddress": email,
                    })
                });

                // const updateData = await updateResponse.json();

                if (updateResponse.ok) {
                    setSuccessMessage('A jelszó sikeresen megváltoztatva!');
                    setErrorMessage('');
                } else {
                    setErrorMessage('Hiba történt a jelszó megváltoztatása során.');
                    setSuccessMessage('');
                }
            } else {
                setErrorMessage('Hibás régi jelszó.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='profile-container'>
            <h1>Jelszó megváltoztatása</h1>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="old">Jelenlegi jelszó</label>
                    <input
                        type="password"
                        id='old'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label htmlFor="new">Új jelszó</label>
                    <input
                        type="password"
                        id='new'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="changepass-btn-group">
                        <button className='btn main-btn changepass-btn' type="button">Mégsem</button>
                        <button className='btn main-btn changepass-btn' type="submit">Megváltoztat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
