<?php
$targetDir = "uploads/";
$targetArtworkFile = $targetDir . $uploadedArtworkFile;
$targetTextFile = $targetDir . $uploadedTextFile;
$uploadOk = 1;
$uploadedArtworkFile = $_FILES['artwork'];
$uploadedTextFile = $_FILES['text'];

$artworkLoc = $targetDir . $artworkFile;
$textLoc = $targetDir . $textFile;

$imageFileTypes[] = pathinfo($artworkLoc, PATHINFO_EXTENSION);
$imageFileTypes[] = pathinfo($textLoc, PATHINFO_EXTENSION);

$validExtensions = array('jpg', 'jpeg', 'png');

foreach ($fileType as $imageFileTypes[]) {
    if (!checkIfValidExtension($fileType)) {
        return;
    }
}

move_uploaded_file($uploadedArtworkFile, $targetArtworkFile);
move_uploaded_file($uploadedTextFile, $targetTextFile);

function checkIfValidExtension($ext) {
    return in_array($ext, $validExtensions);
}

