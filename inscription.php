<?php 
include('config.php'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT); 
    
    $superficie = mysqli_real_escape_string($conn, $_POST['superficie']);
    $frequence = mysqli_real_escape_string($conn, $_POST['frequence']);
    $ville = mysqli_real_escape_string($conn, $_POST['ville']);

    $sql = "INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, superficie, frequence_arrosage, ville) 
            VALUES ('$user', '$email', '$pass', '$superficie', '$frequence', '$ville')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Inscription et configuration réussies !'); window.location.href='connection.php';</script>";
    } else {
        echo "Erreur : " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>HydroTrack - Inscription</title>
    <link rel="stylesheet" href="../code css/style.css">
</head>
<body class="auth-page">
    <div class="login-container">
        <form method="post" class="login-form">
            <h2>Inscription <span class="brand">HydroTrack</span></h2>
            
            <input type="text" name="username" placeholder="Nom d'utilisateur" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Mot de passe" required>
            
            <hr>
            <p style="font-size: 0.8rem; color: #666;">Configuration du champ</p>
            
            <input type="number" name="superficie" placeholder="Superficie (en m²)" required>
            <input type="text" name="ville" placeholder="Ville / Localisation" required>
            
            <select name="frequence" required style="width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px;">
                <option value="" disabled selected>Fréquence d'arrosage</option>
                <option value="Quotidien">Quotidien</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Automatique (Capteurs)">Automatique (Capteurs)</option>
            </select>
            
            <button type="submit" class="btn-primary">Créer mon projet</button>
            
            <p class="footer-text">Déjà inscrit ? <a href="connection.php">Se connecter</a></p>
        </form>
    </div>
</body>
</html>