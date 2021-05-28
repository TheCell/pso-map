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
                Id, Name
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
                Id, Name
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

    public function insert(array $input)
    {
        $statement = "
            INSERT INTO FeatureType 
                (Name)
            VALUES
                (:Name);
        ";

        try
        {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'Name' => $input['Name'],
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