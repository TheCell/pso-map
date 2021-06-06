<?php
namespace Src\TableGateways;

class FeatureTypeGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getFeatureType($id)
    {
        $statement = "
            SELECT 
                Id, Name, Color
            FROM
                FeatureType
            WHERE
                Id = :Id;
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('Id' => $id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function getAllFeatureTypes()
    {
        $statement = "
            SELECT 
                Id, Name, Color
            FROM
                FeatureType;
        ";

        try
        {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }
    
    public function hasMapFeatures($FeatureTypeId)
    {
        $statement = "
            SELECT 
                Id
            FROM
                MapFeature
            WHERE
                FeatureTypeId = :FeatureTypeId;
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('FeatureTypeId' => $FeatureTypeId));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return count($result) > 0;
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function insert(array $input)
    {
        $statement = "
            INSERT INTO FeatureType 
                (Name, Color)
            VALUES
                (:Name, :Color);
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'Name' => $input['Name'],
                'Color' => $input['Color'],
            ));
            return $statement->rowCount();
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM FeatureType
            WHERE Id = :Id;
        ";
        
        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('Id' => $id));
            return $statement->rowCount();
        }
        catch (\PDOException $e)
        {
            exit($e->getMessage());
        }
    }
}