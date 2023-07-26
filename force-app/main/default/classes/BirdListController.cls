public with sharing class BirdListController {

    @AuraEnabled(cacheable=true)
    public static List<Bird__c> getAllBirds(){

        try {
            return [SELECT Id, Name FROM Bird__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void createBird(string name) {
        try {
            
            System.debug('About to create bird with name ' + name);
            Bird__c bird = new Bird__c();
            bird.Name = name;
            insert bird;

        } catch (Exception e) {

            System.debug('creatBird exception ' + e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }
}